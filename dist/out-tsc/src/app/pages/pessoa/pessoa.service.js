import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let PessoaService = class PessoaService {
    constructor(http) {
        this.http = http;
        this.baseUrl = `${environment.apiBaseUrl}/pessoa`;
    }
    listar() {
        return this.http.get(`${this.baseUrl}/listar`);
    }
    buscarPorId(id) {
        return this.http.get(`${this.baseUrl}/${id}`);
    }
    /** --------------------------
     *  CRIAR
     *  -------------------------- */
    salvar(pessoa) {
        return this.http.post(`${this.baseUrl}`, pessoa);
    }
    criar(pessoa) {
        return this.salvar(pessoa);
    }
    /** --------------------------
     *  EDITAR
     *  -------------------------- */
    atualizar(id, pessoa) {
        return this.http.put(`${this.baseUrl}/${id}`, pessoa);
    }
    editar(id, pessoa) {
        return this.atualizar(id, pessoa);
    }
    /** --------------------------
     *  REMOVER
     *  -------------------------- */
    remover(id) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
    /** --------------------------
     *  LISTAS AUXILIARES
     *  -------------------------- */
    listarCondicoesPagamento() {
        return this.http.get(`${environment.apiBaseUrl}/condicoes-pagamento`);
    }
    listarEstados() {
        return this.http.get(`${environment.apiBaseUrl}/estados`);
    }
    listarCidadesPorEstado(estadoId) {
        return this.http.get(`${environment.apiBaseUrl}/cidades/estado/${estadoId}`);
    }
    listarCidades() {
        return this.http.get(`${environment.apiBaseUrl}/cidades`);
    }
    /** --------------------------
     *  BUSCAR CEP
     *  -------------------------- */
    buscarCep(cep) {
        const cleanCep = cep.replace(/\D/g, '');
        return this.http.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
    }
};
PessoaService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], PessoaService);
export { PessoaService };
//# sourceMappingURL=pessoa.service.js.map