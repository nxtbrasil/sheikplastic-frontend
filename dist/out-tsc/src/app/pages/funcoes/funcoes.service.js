import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let FuncoesService = class FuncoesService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiBaseUrl}/funcoes`;
    }
    listar() {
        return this.http.get(this.apiUrl);
    }
    buscarPorId(id) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    criar(funcao) {
        return this.http.post(this.apiUrl, funcao);
    }
    atualizar(id, funcao) {
        return this.http.put(`${this.apiUrl}/${id}`, funcao);
    }
    excluir(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
};
FuncoesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], FuncoesService);
export { FuncoesService };
//# sourceMappingURL=funcoes.service.js.map