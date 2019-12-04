import { Component, OnInit } from '@angular/core';
import { FornecedorService } from '../fornecedor.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-fornecedor-list',
  templateUrl: './fornecedor-list.component.html',
  styleUrls: ['./fornecedor-list.component.scss']
})
export class FornecedorListComponent implements OnInit {

  /* FornecedorService injetado como dependência */
  constructor(
    private fornecedorSrv: FornecedorService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  fornecedores: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome_fornecedor', 'endereco', 'telefone', 'cnpj_cpf', 'rg', 'inscricao_estadual', 'inscricao_municipal', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.fornecedores = await this.fornecedorSrv.listar();
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
        data: { question: 'Deseja realmente excluir este fornecedor?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.fornecedorSrv.excluir(id);
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
