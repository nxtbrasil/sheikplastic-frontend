import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="isLoginPage; else mainLayout">
      <router-outlet></router-outlet>
    </ng-container>

    <ng-template #mainLayout>
      <app-navbar></app-navbar>
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 p-0">
            <router-outlet></router-outlet>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class AppComponent {
  isLoginPage = false;

  constructor(private router: Router) {
    // Detecta mudança de rota
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Define se a página atual é o login ou outra pública
        const publicRoutes = ['/login', '/recuperar-senha'];
        this.isLoginPage = publicRoutes.some(route =>
          this.router.url.startsWith(route)
        );
      }
    });
  }
}
