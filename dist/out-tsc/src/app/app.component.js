import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
let AppComponent = class AppComponent {
    constructor(router) {
        this.router = router;
        this.isLoginPage = false;
        // Filtra apenas eventos de navegação finalizada
        this.routerSub = this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe((event) => {
            const publicRoutes = ['/login', '/recuperar-senha'];
            this.isLoginPage = publicRoutes.some(route => event.urlAfterRedirects.startsWith(route));
        });
    }
    ngOnDestroy() {
        // Evita memory leaks
        if (this.routerSub) {
            this.routerSub.unsubscribe();
        }
    }
};
AppComponent = __decorate([
    Component({
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
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map