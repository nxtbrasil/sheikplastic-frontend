import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let CidadeService = class CidadeService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiBaseUrl}/cidades`;
    }
    listar() {
        return this.http.get(this.apiUrl);
    }
    buscarPorId(id) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    criar(cidade) {
        return this.http.post(this.apiUrl, cidade);
    }
    atualizar(id, cidade) {
        return this.http.put(`${this.apiUrl}/${id}`, cidade);
    }
    excluir(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
};
CidadeService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CidadeService);
export { CidadeService };
//# sourceMappingURL=cidade.service.js.map