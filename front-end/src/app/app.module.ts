import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Habilitar formatação de moeda e data em português
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
registerLocaleData(localePt);

/**** Datas em português no MatDatepicker  ****/

// É preciso instalar os seguintes pacotes:
// yarn add @angular/material-moment-adapter moment

import { MatMomentDateModule, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';

/**********************************************/

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './ui/header/header.component';
import { MainMenuComponent } from './ui/main-menu/main-menu.component';
import { FooterComponent } from './ui/footer/footer.component';
import { ConfirmDlgComponent } from './ui/confirm-dlg/confirm-dlg.component';
import { MatDialogModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { ClienteListComponent } from './cliente/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { VendedorListComponent } from './vendedor/vendedor-list/vendedor-list.component';
import { VendedorFormComponent } from './vendedor/vendedor-form/vendedor-form.component';
import { FornecedorListComponent } from './fornecedor/fornecedor-list/fornecedor-list.component';
import { FornecedorFormComponent } from './fornecedor/fornecedor-form/fornecedor-form.component';
import { ProdutoListComponent } from './produto/produto-list/produto-list.component';
import { ProdutoFormComponent } from './produto/produto-form/produto-form.component';
import { ItemvendaListComponent } from './itemvenda/itemvenda-list/itemvenda-list.component';
import { ItemvendaFormComponent } from './itemvenda/itemvenda-form/itemvenda-form.component';
import { VendasListComponent } from './vendas/vendas-list/vendas-list.component';
import { VendasFormComponent } from './vendas/vendas-form/vendas-form.component';
import { MaterialModule } from './material/material.module';
import { ContatosComponent } from './contatos/contatos/contatos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainMenuComponent,
    FooterComponent,
    ConfirmDlgComponent,
    ClienteListComponent,
    ClienteFormComponent,
    VendedorListComponent,
    VendedorFormComponent,
    FornecedorListComponent,
    FornecedorFormComponent,
    ProdutoListComponent,
    ProdutoFormComponent,
    ItemvendaListComponent,
    ItemvendaFormComponent,
    VendasListComponent,
    VendasFormComponent,
    ContatosComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    NgxMaskModule.forRoot(),
    /**** Datas em português no MatDatepicker  ****/
    MatMomentDateModule
    /**********************************************/    
  ],
  entryComponents: [
    ConfirmDlgComponent
  ],
  providers: [
    /**** Datas em português no MatDatepicker  ****/
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS}
    /**********************************************/
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
