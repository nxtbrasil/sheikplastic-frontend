import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let TipoContatoService = class TipoContatoService {
    constructor(http) {
        this.http = http;
        this.apiUrl = `${environment.apiBaseUrl}/tipos-contato`;
    }
    listar() {
        return this.http.get(this.apiUrl);
    }
    buscarPorDescricao(descricao) {
        return this.http.get(`${this.apiUrl}?descricao=${descricao}`);
    }
    buscarPorId(id) {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    salvar(tipo) {
        return this.http.post(this.apiUrl, tipo);
    }
    atualizar(tipo) {
        return this.http.put(`${this.apiUrl}/${tipo.id}`, tipo);
    }
    excluir(id) {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
};
TipoContatoService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], TipoContatoService);
export { TipoContatoService };
//# sourceMappingURL=tipo-contato.service.js.map