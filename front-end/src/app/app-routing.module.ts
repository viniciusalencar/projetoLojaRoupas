import { Routes, RouterModule } from '@angular/router';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component'
import { FornecedorFormComponent } from './fornecedor/fornecedor-form/fornecedor-form.component'
import { VendedorFormComponent } from './vendedor/vendedor-form/vendedor-form.component'
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component'
import { ItemvendaFormComponent } from './itemvenda/itemvenda-form/itemvenda-form.component'
import { VendasFormComponent } from './vendas/vendas-form/vendas-form.component'

import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { FornecedorListComponent } from './fornecedor/fornecedor-list/fornecedor-list.component';
import { VendedorListComponent } from './vendedor/vendedor-list/vendedor-list.component';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';
import { ItemvendaListComponent } from './itemvenda/itemvenda-list/itemvenda-list.component';
import { VendasListComponent } from './vendas/vendas-list/vendas-list.component';
import { NgModule } from '@angular/core';

import { ContatosComponent } from './contatos/contatos/contatos.component';

const routes: Routes = [ 

  {path: 'cliente', component: ClienteListComponent},
  {path: 'fornecedor', component: FornecedorListComponent},
  {path: 'vendedor', component: VendedorListComponent},
  {path: 'produto', component: ProdutoListComponent},
  {path: 'itemvenda', component: ItemvendaListComponent},
  {path: 'vendas', component: VendasListComponent},
  
  {path: 'cliente/novo', component: ClienteFormComponent},
  {path: 'fornecedor/novo', component: FornecedorFormComponent},
  {path: 'vendedor/novo', component: VendedorFormComponent},
  {path: 'produto/novo', component: ProdutoFormComponent},
  {path: 'itemvenda/novo', component: ItemvendaFormComponent},
  {path: 'vendas/novo', component: VendasFormComponent},

  {path: 'cliente/:id', component: ClienteFormComponent},
  {path: 'fornecedor/:id', component: FornecedorFormComponent},
  {path: 'vendedor/:id', component: VendedorFormComponent},
  {path: 'produto/:id', component: ProdutoFormComponent},
  {path: 'itemvenda/:id', component: ItemvendaFormComponent},
  {path: 'vendas/:id', component: VendasFormComponent},

  {path: 'contatos', component: ContatosComponent}

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

