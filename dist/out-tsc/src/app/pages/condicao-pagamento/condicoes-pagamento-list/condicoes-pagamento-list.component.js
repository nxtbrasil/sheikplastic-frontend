import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let CondicoesPagamentoListComponent = class CondicoesPagamentoListComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.condicoes = [];
        this.condicoesPaginas = [];
        // Paginação
        this.paginaAtual = 0;
        this.itensPorPagina = 10;
        this.paginas = [];
        this.exibicaoInicio = 0;
        this.exibicaoFim = 0;
        this.totalItens = 0;
    }
    ngOnInit() {
        this.listar();
    }
    listar() {
        this.service.listar().subscribe({
            next: dados => {
                this.condicoes = dados;
                this.totalItens = this.condicoes.length;
                this.configurarPaginacao();
            },
            error: () => Swal.fire('Erro', 'Falha ao carregar lista', 'error')
        });
    }
    configurarPaginacao() {
        const totalPaginas = Math.ceil(this.condicoes.length / this.itensPorPagina);
        this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
        this.mudarPagina(0);
    }
    mudarPagina(pagina) {
        if (pagina < 0 || pagina >= this.paginas.length)
            return;
        this.paginaAtual = pagina;
        const inicio = pagina * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        this.condicoesPaginas = this.condicoes.slice(inicio, fim);
        this.exibicaoInicio = this.condicoes.length ? inicio + 1 : 0;
        this.exibicaoFim = Math.min(fim, this.condicoes.length);
    }
    novo() {
        this.router.navigate(['home/_cad/condicoesPagamentoForm']);
    }
    editar(id) {
        this.router.navigate(['home/_cad/condicoesPagamentoForm', id]);
    }
    excluir(id) {
        Swal.fire({
            title: 'Excluir?',
            text: 'Deseja realmente excluir esta condição?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            if (result.isConfirmed) {
                this.service.excluir(id).subscribe({
                    next: () => {
                        Swal.fire('Excluído!', 'Condição removida.', 'success');
                        this.listar();
                    },
                    error: () => Swal.fire('Erro', 'Falha ao excluir', 'error')
                });
            }
        });
    }
};
CondicoesPagamentoListComponent = __decorate([
    Component({
        selector: 'app-condicoes-pagamento-list',
        templateUrl: './condicoes-pagamento-list.component.html',
        styleUrls: ['./condicoes-pagamento-list.component.css']
    })
], CondicoesPagamentoListComponent);
export { CondicoesPagamentoListComponent };
//# sourceMappingURL=condicoes-pagamento-list.component.js.map