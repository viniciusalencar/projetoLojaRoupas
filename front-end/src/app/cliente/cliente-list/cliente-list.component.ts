import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { MatDialog, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})


export class ClienteListComponent implements OnInit {

  /* ClienteService injetado como dependência */
  constructor(
    private clienteSrv: ClienteService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  clientes: any = []; // Vetor vazio
  displayedColumns: string[] = ['nome_cliente', 'endereco', 'telefone', 'cnpj_cpf', 'editar', 'excluir'];

  async ngOnInit() {
    try {
      this.clientes = await this.clienteSrv.listar();
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
        data: { question: 'Deseja realmente excluir este cliente?' }
      });

      // Captura do resultado da confirmação (true ou false)
      // após o fechamento do diálogo de confirmação
      let result = await dialogRef.afterClosed().toPromise();

      if(result) {
        await this.clienteSrv.excluir(id);
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
