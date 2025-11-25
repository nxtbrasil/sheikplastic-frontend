import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let EstadoService = class EstadoService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiBaseUrl}/estados`;
    }
    listar() {
        return this.http.get(this.apiUrl);
    }
    buscarPorId(id) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    salvar(estado) {
        return this.http.post(this.apiUrl, estado);
    }
    atualizar(id, estado) {
        return this.http.put(`${this.apiUrl}/${id}`, estado);
    }
    excluir(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
};
EstadoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EstadoService);
export { EstadoService };
//# sourceMappingURL=estado.service.js.map