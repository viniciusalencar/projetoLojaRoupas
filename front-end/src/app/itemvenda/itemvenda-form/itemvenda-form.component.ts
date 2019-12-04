import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { ItemvendaService } from '../itemvenda.service';
import { VendasService } from '../../vendas/vendas.service';

@Component({
  selector: 'app-itemvenda-form',
  templateUrl: './itemvenda-form.component.html',
  styleUrls: ['./itemvenda-form.component.scss']
})
export class ItemvendaFormComponent implements OnInit {

  constructor(
    private itemvendaSrv: ItemvendaService,
    private vendasSrv: VendasService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novos Itens de Venda';
  itemvenda: any = {};
  vendas: any = [];
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do itemvenda e preenche a variável ligada ao form
        this.itemvenda = await this.itemvendaSrv.obterUm(params['id']);
        this.title = 'Editando itemvenda';
      }
      catch(error) {
        console.log(error);
      }
    }
    try{
      this.vendas = await this.vendasSrv.listar();
    }
    catch(error){
      console.log(error)
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Itemvenda criado com sucesso.';
        
        if(this.itemvenda._id) { // Se tem _id, está editando
          msg = 'Itemvenda atualizado com sucesso';
          await this.itemvendaSrv.atualizar(this.itemvenda);
        }
        else { // Criação de um novo itemvenda
          await this.itemvendaSrv.novo(this.itemvenda);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/itemvenda']); // Volta à listagem
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
      this.router.navigate(['/itemvenda']); // Retorna à listagem
    }

  }

}

