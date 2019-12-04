import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ConfirmDlgComponent } from '../../ui/confirm-dlg/confirm-dlg.component';
import { VendedorService } from '../vendedor.service';

@Component({
  selector: 'app-vendedor-form',
  templateUrl: './vendedor-form.component.html', 
  styleUrls: ['./vendedor-form.component.scss']
})
export class VendedorFormComponent implements OnInit {

  constructor(
    private VendedorSrv: VendedorService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  title: string = 'Novo vendedor';
  vendedor: any = {};
  
  async ngOnInit() {
    let params = this.actRoute.snapshot.params;
    if(params['id']) { // Se houver um parâmetro chamado id na rota
      console.log('id');
      try {
        // Busca os dados do vendedor e preenche a variável ligada ao form
        this.vendedor = await this.VendedorSrv.obterUm(params['id']);
        this.title = 'Editando vendedor';
      }
      catch(error) {
        console.log(error);
      }
    }
  }

  async salvar(form: NgForm) {
    if(form.valid) {
      try {
        let msg = 'Vendedor criado com sucesso.';
        
        if(this.vendedor._id) { // Se tem _id, está editando
          msg = 'Vendedor atualizado com sucesso';
          await this.VendedorSrv.atualizar(this.vendedor);
        }
        else { // Criação de um novo vendedor
          await this.VendedorSrv.novo(this.vendedor);
        }
        
        this.snackBar.open(msg, 'Entendi', {duration: 3000});
        this.router.navigate(['/vendedor']); // Volta à listagem
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
      this.router.navigate(['/vendedor']); // Retorna à listagem
    }

  }

}
