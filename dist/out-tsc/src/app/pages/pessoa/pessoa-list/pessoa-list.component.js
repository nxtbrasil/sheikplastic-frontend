import { __decorate } from "tslib";
import { Component } from '@angular/core';
let PessoaListComponent = class PessoaListComponent {
    constructor(service, router) {
        this.service = service;
        this.router = router;
        this.pessoas = [];
        this.pessoasFiltradas = [];
        this.pessoasPaginadas = [];
        // Paginação
        this.paginaAtual = 0;
        this.itensPorPagina = 10;
        this.paginas = [];
        this.filtroNome = '';
        this.loading = false;
    }
    ngOnInit() {
        this.carregar();
    }
    carregar() {
        this.loading = true;
        this.service.listar().subscribe({
            next: data => {
                this.pessoas = data;
                this.pessoasFiltradas = data;
                this.loading = false;
                this.paginaAtual = 0; // resetar para a primeira página ao recarregar dados
                this.atualizarPaginacao();
            },
            error: () => {
                this.error = 'Erro ao carregar pessoas';
                this.loading = false;
            }
        });
    }
    filtrar() {
        const termo = this.filtroNome.toLowerCase().trim();
        this.pessoasFiltradas = this.pessoas.filter(p => p.nome.toLowerCase().includes(termo));
        this.atualizarPaginacao();
    }
    limparFiltro() {
        this.filtroNome = '';
        this.pessoasFiltradas = [...this.pessoas];
        this.atualizarPaginacao();
    }
    novo() {
        this.router.navigate(['/home/_cad/pessoasForm']);
    }
    editar(id) {
        this.router.navigate(['/home/_cad/pessoasForm', id]);
    }
    excluir(id) {
        if (!confirm('Excluir pessoa?'))
            return;
        this.service.remover(id).subscribe({
            next: () => this.carregar(),
            error: () => alert('Erro ao excluir')
        });
    }
    atualizarPaginacao() {
        const totalPaginas = Math.max(1, Math.ceil(this.pessoasFiltradas.length / this.itensPorPagina));
        this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
        // ajustar paginaAtual se por acaso for maior que totalPaginas - 1
        if (this.paginaAtual >= totalPaginas) {
            this.paginaAtual = totalPaginas - 1;
        }
        const inicio = this.paginaAtual * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        this.pessoasPaginadas = this.pessoasFiltradas.slice(inicio, fim);
    }
    mudarPagina(pagina) {
        if (pagina < 0) {
            pagina = 0;
        }
        if (pagina >= this.paginas.length) {
            pagina = this.paginas.length - 1;
        }
        if (pagina === this.paginaAtual)
            return;
        this.paginaAtual = pagina;
        this.atualizarPaginacao();
    }
    // Métodos para exibição segura do range
    get exibicaoInicio() {
        if (this.pessoasFiltradas.length === 0)
            return 0;
        return this.paginaAtual * this.itensPorPagina + 1;
    }
    get exibicaoFim() {
        if (this.pessoasFiltradas.length === 0)
            return 0;
        return Math.min((this.paginaAtual + 1) * this.itensPorPagina, this.pessoasFiltradas.length);
    }
    get totalItens() {
        return this.pessoasFiltradas.length;
    }
};
PessoaListComponent = __decorate([
    Component({
        selector: 'app-pessoa-list',
        templateUrl: './pessoa-list.component.html',
        styleUrls: ['./pessoa-list.component.css']
    })
], PessoaListComponent);
export { PessoaListComponent };
//# sourceMappingURL=pessoa-list.component.js.map