import { Component, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="isLoginPage; else mainLayout">
      <router-outlet></router-outlet>
    </ng-container>

    <ng-template #mainLayout>
      <app-navbar></app-navbar>
      <div class="container-fluid p-0">
        <router-outlet></router-outlet>
      </div>
    </ng-template>
  `,
})
export class AppComponent implements OnDestroy {
  isLoginPage = false;
  private routerSub!: Subscription;

  constructor(private router: Router) {
    // Filtra apenas eventos de navegação finalizada
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const publicRoutes = ['/login', '/recuperar-senha'];
        this.isLoginPage = publicRoutes.some(route =>
          event.urlAfterRedirects.startsWith(route)
        );
      });
  }

  ngOnDestroy(): void {
    // Evita memory leaks
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
