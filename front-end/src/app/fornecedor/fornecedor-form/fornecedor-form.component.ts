import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent implements OnInit {

  constructor(
    private FornecedorSrv: FornecedorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo fornecedor';
  fornecedor: any = {};
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do fornecedor e preenche a variável ligada ao form
        this.fornecedor = await this.FornecedorSrv.obterUm(params['id']);
        this.title = 'Editando fornecedor';
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Fornecedor criado com sucesso.';
        
        if(this.fornecedor._id) { // Se tem _id, está editando
          msg = 'Fornecedor atualizado com sucesso';
          await this.FornecedorSrv.atualizar(this.fornecedor);
        }
        else { // Criação de um novo fornecedor
          await this.FornecedorSrv.novo(this.fornecedor);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/fornecedor']); // Volta à listagem
      }
      catch(error) {
        console.log(error);
        this.snackBar.open('ERRO: não foi possível salvar os dados.', 'Entendi',
          {duration: 3000});
      }
    }
  }

  async voltar(form: NgForm) {
    
    let result = true;
    console.log(form);
    // form.dirty = formulário "sujo", não salvo (via código)
    // form.touched = o conteúdo de algum campo foi alterado (via usuário)
    if(form.dirty && form.touched) {
      let dialogRef = this.dialog.open(ConfirmDlgComponent, {
        width: '50%',
        data: { question: 'Há dados não salvos. Deseja realmente voltar?' }
      });

      result = await dialogRef.afterClosed().toPromise();

    }

    if(result) {
      this.router.navigate(['/fornecedor']); // Retorna à listagem
    }

  }

}
