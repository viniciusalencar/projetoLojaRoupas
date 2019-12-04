import { Component, OnInit } from '@angular/core';
import { VendedorService } from '../vendedor.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-vendedor-list',
  templateUrl: './vendedor-list.component.html',
  styleUrls: ['./vendedor-list.component.scss']
})
export class VendedorListComponent implements OnInit {

  /* VendedorService injetado como dependência */
  constructor(
    private vendedorSrv: VendedorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  vendedores: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome_vendedor', 'endereco', 'email', 'rg', 'cpf', 'data_nascimento', 'setor', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.vendedores = await this.vendedorSrv.listar();
    }
    catch(error) {
      console.error(error);
    }
  
  }

  async excluir(id: string) {
    try {

      // Exibição da caixa de diálogo de confirmação
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Deseja realmente excluir este vendedor?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.vendedorSrv.excluir(id);
        this.snackBar.open('Exclusão efetuada com sucesso', 'Entendi',
          { duration: 3000 });
        this.ngOnInit(); // Atualizar os dados
      }      

    }
    catch(erro) {
      console.log(erro);
      this.snackBar.open('ERRO: não foi possível excluir. Contate o suporte técnico',
       'Entendi', { duration: 3000 });
    }
  }

}
