import { Component, OnInit } from '@angular/core';
import { VendasService } from '../vendas.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-vendas-list',
  templateUrl: './vendas-list.component.html',
  styleUrls: ['./vendas-list.component.scss']
})
export class VendasListComponent implements OnInit {

  /* VendasService injetado como dependência */
  constructor(
    private vendasSrv: VendasService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  vendas: any = []; // Vetor vazio
  displayedColumns: string[] = ['cliente', 'produto', 'vendedor', 'data_venda', 'nota_fiscal', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.vendas = await this.vendasSrv.listar();
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
        data: { question: 'Deseja realmente excluir esta venda?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.vendasSrv.excluir(id);
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
