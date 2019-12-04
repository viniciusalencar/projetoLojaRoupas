import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { VendasService } from '../vendas.service';
import { ProdutoService} from '../../produto/produto.service';
import { ClienteService} from '../../cliente/cliente.service';
import { VendedorService} from '../../vendedor/vendedor.service';



@Component({
  selector: 'app-vendas-form',
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.scss'] 
})
export class VendasFormComponent implements OnInit {

  constructor(
    private vendasSrv: VendasService,
    private produtoSrv: ProdutoService,
    private vendedorSrv: VendedorService,
    private clienteSrv: ClienteService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Nova vendas';
  vendas: any = {};
  produtos: any = [];
  clientes: any = [];
  vendedores: any = [];
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      try {
        // Busca os dados do vendas e preenche a variável ligada ao form
        this.vendas = await this.vendasSrv.obterUm(params['id']);
        this.title = 'Editando vendas';
      }
      catch(error) {
        console.log(error);
      }
    }
    try {
      this.produtos = await this.produtoSrv.listar();
      this.clientes = await this.clienteSrv.listar();
      this.vendedores = await this.vendedorSrv.listar();

    }
    catch(error){
      console.log(error)
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Vendas criado com sucesso.';
        
        if(this.vendas._id) { // Se tem _id, está editando
          msg = 'Vendas atualizado com sucesso';
          await this.vendasSrv.atualizar(this.vendas);
        }
        else { // Criação de um novo vendas
          await this.vendasSrv.novo(this.vendas);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/vendas']); // Volta à listagem
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
      this.router.navigate(['/vendas']); // Retorna à listagem
    }

  }

}
