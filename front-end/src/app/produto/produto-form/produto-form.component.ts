import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { ProdutoService } from '../produto.service';
import { FornecedorService } from '../../fornecedor/fornecedor.service';


@Component({
  selector: 'app-produto-form', 
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss'] 
})
export class ProdutoFormComponent implements OnInit {

  constructor(
    private produtoSrv: ProdutoService,
    private fornecedorSrv: FornecedorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo produto';
  produto: any = {};
  fornecedores: any = [];
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do produto e preenche a variável ligada ao form
        this.produto = await this.produtoSrv.obterUm(params['id']);
        this.title = 'Editando produto';
      }
      catch(error) {
        console.log(error);
      }
    }
    try{
      this.fornecedores = await this.fornecedorSrv.listar();
    }
    catch(error){
      console.log(error)
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Produto criado com sucesso.';
        
        if(this.produto._id) { // Se tem _id, está editando
          msg = 'Produto atualizado com sucesso';
          await this.produtoSrv.atualizar(this.produto);
        }
        else { // Criação de um novo produto
          await this.produtoSrv.novo(this.produto);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/produto']); // Volta à listagem
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
      this.router.navigate(['/produto']); // Retorna à listagem
    }

  }

}
