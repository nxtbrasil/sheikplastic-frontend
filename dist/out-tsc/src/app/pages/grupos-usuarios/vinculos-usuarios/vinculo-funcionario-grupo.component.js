import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
let VinculoFuncionarioGrupoComponent = class VinculoFuncionarioGrupoComponent {
    constructor(http, route, router) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.grupos = [];
        this.funcionarios = [];
        this.grupoSelecionado = null;
        this.grupoAtual = null;
        this.filtro = '';
        this.carregando = false;
        this.apiUrl = `${environment.apiBaseUrl}`;
    }
    ngOnInit() {
        this.route.paramMap.subscribe((params) => {
            const idGrupo = params.get('id');
            if (idGrupo) {
                this.grupoSelecionado = Number(idGrupo);
                this.carregarGrupoSelecionado(this.grupoSelecionado);
            }
            else {
                this.carregarGrupos();
            }
        });
    }
    voltar() {
        this.router.navigate(['/home/_adm/gruposUsuarioListar']);
    }
    /** 🔹 Busca o grupo específico e carrega funcionários via /api/grupos-usuario/{id}/funcionarios */
    carregarGrupoSelecionado(idGrupo) {
        this.http.get(`${this.apiUrl}/grupos-usuario/${idGrupo}`).subscribe({
            next: (grupo) => {
                this.grupoAtual = grupo;
                this.grupos = [grupo];
                this.carregarFuncionariosVinculados();
            },
            error: (err) => {
                console.error('Erro ao carregar grupo', err);
                Swal.fire('Erro', 'Não foi possível carregar o grupo selecionado.', 'error');
            },
        });
    }
    carregarGrupos() {
        this.http.get(`${this.apiUrl}/grupos-usuario`).subscribe({
            next: (data) => (this.grupos = data),
            error: (err) => console.error('Erro ao carregar grupos', err),
        });
    }
    /** 🔹 Chama o endpoint /api/grupos-usuario/{id}/funcionarios */
    carregarFuncionariosVinculados() {
        if (!this.grupoSelecionado)
            return;
        this.carregando = true;
        this.http
            .get(`${this.apiUrl}/grupos-usuario/${this.grupoSelecionado}/funcionarios`)
            .subscribe({
            next: (data) => {
                this.funcionarios = data;
                this.carregando = false;
            },
            error: (err) => {
                console.error('Erro ao carregar funcionários do grupo', err);
                Swal.fire('Erro', 'Falha ao carregar funcionários do grupo.', 'error');
                this.carregando = false;
            },
        });
    }
    /** 🔍 Filtro de busca */
    funcionariosFiltrados() {
        const termo = this.filtro.toLowerCase();
        return this.funcionarios.filter((f) => f.nomeFuncionario.toLowerCase().includes(termo) ||
            f.emailFuncionario.toLowerCase().includes(termo));
    }
    /** 🔄 Alternar vínculo */
    alternarVinculo(func) {
        if (!this.grupoSelecionado) {
            Swal.fire('Atenção', 'Selecione um grupo antes de vincular.', 'warning');
            return;
        }
        func.vinculado
            ? this.desvincularFuncionario(func)
            : this.vincularFuncionario(func);
    }
    /** 🔗 Vincular funcionário */
    vincularFuncionario(func) {
        const url = `${this.apiUrl}/grupo-usuario-funcionario/vincular?idFuncionario=${func.idFuncionario}&idGrupoUsuario=${this.grupoSelecionado}`;
        this.carregando = true;
        this.http.post(url, null).subscribe({
            next: () => {
                Swal.fire('Sucesso', 'Funcionário vinculado com sucesso!', 'success');
                func.vinculado = true;
                this.carregando = false;
            },
            error: (err) => {
                console.error(err);
                Swal.fire('Erro', 'Não foi possível vincular o funcionário.', 'error');
                this.carregando = false;
            },
        });
    }
    /** 🔓 Desvincular funcionário */
    desvincularFuncionario(func) {
        Swal.fire({
            title: 'Tem certeza?',
            text: 'O funcionário será desvinculado deste grupo.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, desvincular',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (!result.isConfirmed)
                return;
            this.carregando = true;
            const url = `${this.apiUrl}/grupo-usuario-funcionario/desvincular/${func.idFuncionario}?idGrupoUsuario=${this.grupoSelecionado}`;
            this.http.delete(url).subscribe({
                next: () => {
                    Swal.fire('Sucesso', 'Funcionário desvinculado!', 'success');
                    func.vinculado = false;
                    this.carregando = false;
                },
                error: (err) => {
                    console.error(err);
                    Swal.fire('Erro', 'Não foi possível desvincular o funcionário.', 'error');
                    this.carregando = false;
                },
            });
        });
    }
};
VinculoFuncionarioGrupoComponent = __decorate([
    Component({
        selector: 'app-vinculo-funcionario-grupo',
        templateUrl: './vinculo-funcionario-grupo.component.html',
        styleUrls: ['./vinculo-funcionario-grupo.component.css'],
    })
], VinculoFuncionarioGrupoComponent);
export { VinculoFuncionarioGrupoComponent };
//# sourceMappingURL=vinculo-funcionario-grupo.component.js.map