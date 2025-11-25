import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
let VinculoRegraGrupoComponent = class VinculoRegraGrupoComponent {
    constructor(http, route, router) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.modulos = [];
        this.modulosFiltrados = [];
        this.busca = '';
        this.carregando = false;
    }
    ngOnInit() {
        this.grupoId = Number(this.route.snapshot.paramMap.get('id'));
        this.carregarRegras();
    }
    carregarRegras() {
        this.carregando = true;
        const todasRegras$ = this.http.get(`${environment.apiBaseUrl}/grupos-usuario/regras`);
        const regrasVinculadas$ = this.http.get(`${environment.apiBaseUrl}/grupos-usuario/${this.grupoId}/regras`);
        Promise.all([todasRegras$.toPromise(), regrasVinculadas$.toPromise()])
            .then(([todas, vinculadas]) => {
            const vinculadasIds = vinculadas.map((r) => r.idRegra);
            todas.forEach((r) => (r.vinculada = vinculadasIds.includes(r.idRegra)));
            this.modulos = this.agruparPorModulo(todas);
            this.modulosFiltrados = [...this.modulos];
        })
            .catch(() => Swal.fire('Erro', 'Falha ao carregar regras.', 'error'))
            .finally(() => (this.carregando = false));
    }
    agruparPorModulo(regras) {
        const grupos = {};
        regras.forEach((r) => {
            const match = r.descricaoRegra.match(/\[(.*?)\]/);
            const modulo = match ? match[1] : 'Outros';
            if (!grupos[modulo])
                grupos[modulo] = [];
            grupos[modulo].push(r);
        });
        return Object.keys(grupos)
            .sort()
            .map((modulo) => ({ nome: modulo, regras: grupos[modulo] }));
    }
    filtrar() {
        const termo = this.busca.toLowerCase();
        this.modulosFiltrados = this.modulos
            .map((m) => ({
            ...m,
            regras: m.regras.filter((r) => r.descricaoRegra.toLowerCase().includes(termo)),
        }))
            .filter((m) => m.regras.length > 0);
    }
    voltar() {
        this.router.navigate(['/home/_adm/gruposUsuarioListar']);
    }
    alternarVinculo(regra) {
        const url = `${environment.apiBaseUrl}/grupos-usuario/${this.grupoId}/regras/${regra.idRegra}`;
        // Define o tipo de resposta como texto
        const acao = regra.vinculada
            ? this.http.delete(url, { responseType: 'text' })
            : this.http.post(url, {}, { responseType: 'text' });
        regra.vinculada = !regra.vinculada;
        acao.subscribe({
            next: (resposta) => {
                // Mostra a resposta real do backend
                Swal.fire({
                    title: resposta,
                    icon: regra.vinculada ? 'success' : 'info',
                    timer: 1500,
                    showConfirmButton: false,
                });
            },
            error: (err) => {
                // Reverte o estado visual se falhar
                regra.vinculada = !regra.vinculada;
                Swal.fire('Erro', 'Não foi possível atualizar o vínculo.', 'error');
                console.error('Erro ao atualizar vínculo:', err);
            },
        });
    }
};
VinculoRegraGrupoComponent = __decorate([
    Component({
        selector: 'app-vinculo-regra-grupo',
        templateUrl: './vinculo-regra-grupo.component.html',
        styleUrls: ['./vinculo-regra-grupo.component.css'],
    })
], VinculoRegraGrupoComponent);
export { VinculoRegraGrupoComponent };
//# sourceMappingURL=vinculo-regra-grupo.component.js.map