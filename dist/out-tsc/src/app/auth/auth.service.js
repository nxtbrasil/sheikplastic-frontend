import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
let AuthService = class AuthService {
    constructor(http) {
        this.http = http;
        this.api = environment.apiBaseUrl + '/auth';
    }
    login(email, senha) {
        return this.http.post(this.api + '/login', { email, senha }).pipe(tap(res => {
            if (res && res.token) {
                localStorage.setItem('token', res.token);
                localStorage.setItem('idFuncionario', res.idFuncionario?.toString() || '');
                localStorage.setItem('userName', res.nomeFuncionario || '');
            }
        }));
    }
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('idFuncionario');
        localStorage.removeItem('userName');
    }
    getToken() {
        return localStorage.getItem('token');
    }
    isLogged() {
        return !!this.getToken();
    }
    getIdFuncionario() {
        return localStorage.getItem('idFuncionario');
    }
};
AuthService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map