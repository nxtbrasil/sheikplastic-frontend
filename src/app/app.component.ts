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

      <!-- CONTAINER PRINCIPAL QUE OCUPA A TELA TODA -->
      <div class="main-wrapper">
        <router-outlet></router-outlet>
      </div>
    </ng-template>
  `,
})
export class AppComponent implements OnDestroy {
  isLoginPage = false;
  private routerSub!: Subscription;

  constructor(private router: Router) {
    this.routerSub = this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const publicRoutes = ['/login', '/recuperar-senha'];

        this.isLoginPage = publicRoutes.some(route =>
          event.urlAfterRedirects.startsWith(route)
        );

        this.updateBodyScroll();
      });
  }

  /** Remove o scroll externo quando não estiver no login */
  updateBodyScroll() {
    if (this.isLoginPage) {
      document.body.classList.remove('no-scroll');
    } else {
      document.body.classList.add('no-scroll');
    }
  }

  ngOnDestroy(): void {
    if (this.routerSub) {
      this.routerSub.unsubscribe();
    }
  }
}
