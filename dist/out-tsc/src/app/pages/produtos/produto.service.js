import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let ProdutoService = class ProdutoService {
    constructor(http) {
        this.http = http;
        this.API = `${environment.apiBaseUrl}/produtos`;
    }
    listar(nomeProduto) {
        const url = nomeProduto ? `${this.API}?nomeProduto=${nomeProduto}` : this.API;
        return this.http.get(url);
    }
    buscarPorId(id) {
        return this.http.get(`${this.API}/${id}`);
    }
    salvar(produto) {
        return this.http.post(this.API, produto);
    }
    atualizar(produto) {
        return this.http.put(`${this.API}/${produto.idProduto}`, produto);
    }
    excluir(id) {
        return this.http.delete(`${this.API}/${id}`);
    }
};
ProdutoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], ProdutoService);
export { ProdutoService };
//# sourceMappingURL=produto.service.js.map