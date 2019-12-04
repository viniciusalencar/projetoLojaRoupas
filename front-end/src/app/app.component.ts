import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header [appName]="title"></app-header>
    <section id="content">
      <router-outlet></router-outlet>
    </section>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'V&A! Sistema de Gerenciamento de Loja de Roupas';
}
