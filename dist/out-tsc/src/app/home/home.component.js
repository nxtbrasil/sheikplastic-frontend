import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
let HomeComponent = class HomeComponent {
    constructor(menuService, auth, router) {
        this.menuService = menuService;
        this.auth = auth;
        this.router = router;
        this.menu = [];
        this.openedMenu = null;
        this.isCollapsed = false;
    }
    ngOnInit() {
        this.loadMenu();
    }
    /** Carrega menu do serviço */
    loadMenu() {
        this.menuService.getMenu().subscribe({
            next: (data) => {
                this.menu = this.removeAspRecursively(data);
            },
            error: (err) => console.error('Erro ao carregar menu:', err),
        });
    }
    removeAspRecursively(items) {
        return items.map(item => ({
            ...item,
            endereco: item.endereco ? item.endereco.replace(/\.asp$/i, '') : null,
            subMenus: item.subMenus ? this.removeAspRecursively(item.subMenus) : []
        }));
    }
    /** Abre/fecha submenus */
    toggleMenu(id) {
        this.openedMenu = this.openedMenu === id ? null : id;
    }
    /** Colapsa/expande a sidebar */
    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
        // Fecha submenus automaticamente ao colapsar
        if (this.isCollapsed) {
            this.openedMenu = null;
        }
    }
    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
};
HomeComponent = __decorate([
    Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.css'],
        animations: [
            trigger('expandCollapse', [
                state('void', style({ height: '0', opacity: 0, overflow: 'hidden' })),
                state('*', style({ height: '*', opacity: 1, overflow: 'hidden' })),
                transition('void <=> *', animate('200ms ease-in-out')),
            ])
        ]
    })
], HomeComponent);
export { HomeComponent };
//# sourceMappingURL=home.component.js.map