import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
let FuncionariosListComponent = class FuncionariosListComponent {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.funcionarios = [];
        this.funcionariosPaginados = [];
        this.resumoFuncoes = [];
        this.funcoesComQuantidade = [];
        this.Math = Math;
        this.paginaAtual = 0;
        this.itensPorPagina = 5;
        this.paginas = [];
        this.funcionariosAtivos = 0;
        this.funcionariosInativos = 0;
        this.totalCargos = 0;
        this.carregando = false;
        this.erro = null;
    }
    ngOnInit() {
        this.carregarFuncionarios();
    }
    carregarFuncionarios() {
        this.carregando = true;
        this.http.get(`${environment.apiBaseUrl}/funcionarios`).subscribe({
            next: (data) => {
                this.funcionarios = data;
                // Calcula os quantitativos
                this.funcionariosAtivos = data.filter(f => f.ativo).length;
                this.funcionariosInativos = data.filter(f => !f.ativo).length;
                // Conta cargos únicos
                const cargos = new Set(data.map(f => f.nomeFuncao));
                this.totalCargos = cargos.size;
                this.atualizarResumo();
                this.atualizarPaginacao();
                this.gerarQuantitativoPorFuncao();
                this.carregando = false;
            },
            error: (err) => {
                console.error('Erro ao carregar funcionários:', err);
                this.erro = 'Erro ao carregar funcionários.';
                this.carregando = false;
            }
        });
    }
    gerarQuantitativoPorFuncao() {
        const mapa = new Map();
        this.funcionarios.forEach((f) => {
            const funcao = f.nomeFuncao || 'Sem Função';
            mapa.set(funcao, (mapa.get(funcao) || 0) + 1);
        });
        this.funcoesComQuantidade = Array.from(mapa, ([nomeFuncao, quantidade]) => ({
            nomeFuncao,
            quantidade,
        }));
    }
    atualizarResumo() {
        const mapa = new Map();
        for (const f of this.funcionarios) {
            mapa.set(f.nomeFuncao, (mapa.get(f.nomeFuncao) || 0) + 1);
        }
        this.resumoFuncoes = Array.from(mapa, ([nomeFuncao, total]) => ({ nomeFuncao, total }));
    }
    atualizarPaginacao() {
        const totalPaginas = Math.ceil(this.funcionarios.length / this.itensPorPagina);
        this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
        this.funcionariosPaginados = this.funcionarios.slice(this.paginaAtual * this.itensPorPagina, (this.paginaAtual + 1) * this.itensPorPagina);
    }
    mudarPagina(p) {
        if (p < 0 || p >= this.paginas.length)
            return;
        this.paginaAtual = p;
        this.atualizarPaginacao();
    }
    novoFuncionario() {
        this.router.navigate(['/home/_adm/funcionariosForm']);
    }
    editar(func) {
        this.router.navigate([`/home/_adm/funcionariosForm/${func.idFuncionario}`]);
    }
    excluir(func) {
        Swal.fire({
            title: 'Excluir funcionário?',
            html: `Tem certeza que deseja excluir <strong>${func.nomeFuncionario}</strong>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-trash"></i> Sim, excluir',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc3545',
            cancelButtonColor: '#6c757d',
            reverseButtons: true,
            focusCancel: true,
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Excluindo...',
                    html: 'Por favor, aguarde enquanto o funcionário é removido.',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                this.http.delete(`${environment.apiBaseUrl}/funcionarios/${func.idFuncionario}`).subscribe({
                    next: () => {
                        this.carregarFuncionarios();
                        Swal.fire({
                            title: 'Excluído!',
                            text: `O funcionário ${func.nomeFuncionario} foi removido com sucesso.`,
                            icon: 'success',
                            confirmButtonColor: '#198754',
                            timer: 1800,
                            showConfirmButton: false
                        });
                    },
                    error: (err) => {
                        console.error('Erro ao excluir funcionário:', err);
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível excluir o funcionário.',
                            icon: 'error',
                            confirmButtonColor: '#dc3545'
                        });
                    }
                });
            }
        });
    }
};
FuncionariosListComponent = __decorate([
    Component({
        selector: 'app-funcionarios-list',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './funcionarios-list.component.html',
        styleUrls: ['./funcionarios-list.component.css']
    })
], FuncionariosListComponent);
export { FuncionariosListComponent };
//# sourceMappingURL=funcionarios-list.component.js.map