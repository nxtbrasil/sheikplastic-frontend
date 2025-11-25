import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
let MenuService = class MenuService {
    constructor(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    getMenu() {
        const id = this.auth.getIdFuncionario() || '';
        return this.http.get(`${environment.apiBaseUrl}/menu/${id}`);
    }
};
MenuService = __decorate([
    Injectable({ providedIn: 'root' })
], MenuService);
export { MenuService };
//# sourceMappingURL=menu.service.js.map