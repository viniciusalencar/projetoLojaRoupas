import { Component, OnInit } from '@angular/core';
import { ItemvendaService } from '../itemvenda.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-itemvenda-list',
  templateUrl: './itemvenda-list.component.html',
  styleUrls: ['./itemvenda-list.component.scss']
})
export class ItemvendaListComponent implements OnInit {

  /* ItemvendaService injetado como dependência */
  constructor(
    private itemvendaSrv: ItemvendaService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  itemvendas: any = []; // Vetor vazio
  displayedColumns: string[] = ['vendas', 'quantidade', 'desconto', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.itemvendas = await this.itemvendaSrv.listar();
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
        data: { question: 'Deseja realmente excluir este item de venda?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.itemvendaSrv.excluir(id);
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
