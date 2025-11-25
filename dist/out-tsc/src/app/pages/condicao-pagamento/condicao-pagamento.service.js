import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let CondicaoPagamentoService = class CondicaoPagamentoService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiBaseUrl}/condicoes-pagamento`;
    }
    listar() {
        return this.http.get(this.apiUrl);
    }
    buscarPorId(id) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    salvar(condicao) {
        return this.http.post(this.apiUrl, condicao);
    }
    atualizar(id, condicao) {
        return this.http.put(`${this.apiUrl}/${id}`, condicao);
    }
    excluir(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
};
CondicaoPagamentoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], CondicaoPagamentoService);
export { CondicaoPagamentoService };
//# sourceMappingURL=condicao-pagamento.service.js.map