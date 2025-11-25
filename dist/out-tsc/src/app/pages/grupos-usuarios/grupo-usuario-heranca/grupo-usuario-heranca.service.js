import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let GrupoUsuarioHerancaService = class GrupoUsuarioHerancaService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8181/api/grupos'; // ajuste conforme seu backend
    }
    listar(idGrupoPai) {
        return this.http.get(`${this.baseUrl}/${idGrupoPai}/herancas`);
    }
    listarTodosGrupos() {
        return this.http.get(`${this.baseUrl}`);
    }
    vincular(idGrupoPai, idGrupoFilho) {
        // ✅ responseType deve ir nas opções do request, não no body
        return this.http.post(`${this.baseUrl}/${idGrupoPai}/herancas/${idGrupoFilho}`, {}, { responseType: 'text' });
    }
    desvincular(idGrupoPai, idGrupoFilho) {
        // ✅ mesma correção aqui
        return this.http.delete(`${this.baseUrl}/${idGrupoPai}/herancas/${idGrupoFilho}`, { responseType: 'text' });
    }
};
GrupoUsuarioHerancaService = __decorate([
    Injectable({
        providedIn: 'root',
    })
], GrupoUsuarioHerancaService);
export { GrupoUsuarioHerancaService };
//# sourceMappingURL=grupo-usuario-heranca.service.js.map