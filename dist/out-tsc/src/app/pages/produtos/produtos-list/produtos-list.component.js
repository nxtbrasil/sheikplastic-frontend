import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
let ProdutosListComponent = class ProdutosListComponent {
    constructor(service, router, http) {
        this.service = service;
        this.router = router;
        this.http = http;
        this.produtos = [];
        this.produtosPaginados = [];
        this.filtroNome = '';
        // Paginação
        this.paginaAtual = 0;
        this.itensPorPagina = 10;
        this.paginas = [];
    }
    ngOnInit() {
        this.carregarProdutos();
    }
    carregarProdutos() {
        this.service.listar(this.filtroNome).subscribe({
            next: data => {
                this.produtos = data || [];
                this.paginaAtual = 0;
                this.atualizarPaginacao();
            },
            error: err => console.error('Erro ao carregar produtos', err)
        });
    }
    aplicarFiltro() {
        this.carregarProdutos();
    }
    limparFiltro() {
        this.filtroNome = '';
        this.carregarProdutos();
    }
    novoProduto() {
        this.router.navigate(['/home/_cad/produtosForm']);
    }
    editarProduto(id) {
        this.router.navigate(['/home/_cad/produtosForm', id]);
    }
    excluirProduto(produto) {
        console.log('Excluir Produto chamada para:', produto);
        Swal.fire({
            title: 'Excluir cidade?',
            html: `Tem certeza que deseja excluir <strong>${produto.nomeProduto}</strong>?`,
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
                    html: 'Por favor, aguarde enquanto a cidade é removida.',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });
                this.http.delete(`${environment.apiBaseUrl}/produtos/${produto.idProduto}`).subscribe({
                    next: () => {
                        this.carregarProdutos();
                        Swal.fire({
                            title: 'Excluída!',
                            text: `A cidade ${produto.nomeProduto} foi removida com sucesso.`,
                            icon: 'success',
                            confirmButtonColor: '#198754',
                            timer: 1800,
                            showConfirmButton: false
                        });
                    },
                    error: (err) => {
                        console.error('Erro ao excluir cidade:', err);
                        Swal.fire({
                            title: 'Erro!',
                            text: 'Não foi possível excluir a cidade.',
                            icon: 'error',
                            confirmButtonColor: '#dc3545'
                        });
                    }
                });
            }
        });
    }
    // excluirProduto(id: number): void {
    //   if (confirm('Deseja realmente excluir este produto?')) {
    //     this.service.excluir(id).subscribe(() => this.carregarProdutos());
    //   }
    // }
    // ===== PAGINAÇÃO =====
    atualizarPaginacao() {
        const totalPaginas = Math.max(1, Math.ceil(this.produtos.length / this.itensPorPagina));
        this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
        if (this.paginaAtual >= totalPaginas) {
            this.paginaAtual = totalPaginas - 1;
        }
        const inicio = this.paginaAtual * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        this.produtosPaginados = this.produtos.slice(inicio, fim);
    }
    mudarPagina(pagina) {
        if (pagina < 0)
            pagina = 0;
        if (pagina >= this.paginas.length)
            pagina = this.paginas.length - 1;
        if (pagina === this.paginaAtual)
            return;
        this.paginaAtual = pagina;
        this.atualizarPaginacao();
    }
    get exibicaoInicio() {
        if (this.produtos.length === 0)
            return 0;
        return this.paginaAtual * this.itensPorPagina + 1;
    }
    get exibicaoFim() {
        if (this.produtos.length === 0)
            return 0;
        return Math.min((this.paginaAtual + 1) * this.itensPorPagina, this.produtos.length);
    }
    get totalItens() {
        return this.produtos.length;
    }
};
ProdutosListComponent = __decorate([
    Component({
        selector: 'app-produtos-list',
        templateUrl: './produtos-list.component.html',
        styleUrls: ['./produtos-list.component.css']
    })
], ProdutosListComponent);
export { ProdutosListComponent };
//# sourceMappingURL=produtos-list.component.js.map