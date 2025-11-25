import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let UsuarioService = class UsuarioService {
    constructor(http) {
        this.http = http;
        this.api = environment.apiBaseUrl + '/funcionarios';
    }
    criarUsuario(usuario) {
        return this.http.post(this.api, usuario);
    }
};
UsuarioService = __decorate([
    Injectable({ providedIn: 'root' })
], UsuarioService);
export { UsuarioService };
//# sourceMappingURL=usuario.service.js.map