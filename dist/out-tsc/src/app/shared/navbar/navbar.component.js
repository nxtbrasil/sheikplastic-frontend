import { __decorate } from "tslib";
import { Component, HostListener } from '@angular/core';
let NavbarComponent = class NavbarComponent {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
        this.userName = '';
        this.dropdownOpen = false;
        this.userName = localStorage.getItem('userName') || '';
    }
    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
    }
    // Fecha o dropdown clicando fora
    clickOutside(event) {
        const target = event.target;
        if (!target.closest('.dropdown')) {
            this.dropdownOpen = false;
        }
    }
    logout() {
        this.auth.logout();
        this.router.navigate(['/login']);
    }
};
__decorate([
    HostListener('document:click', ['$event'])
], NavbarComponent.prototype, "clickOutside", null);
NavbarComponent = __decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.css']
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map