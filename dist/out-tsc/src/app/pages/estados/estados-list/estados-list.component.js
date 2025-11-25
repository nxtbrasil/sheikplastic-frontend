import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let EstadosListComponent = class EstadosListComponent {
    constructor(estadoService, router) {
        this.estadoService = estadoService;
        this.router = router;
        this.estados = [];
        // 🔹 Paginação
        this.paginaAtual = 0; // começa em 0 para alinhar com outros componentes
        this.itensPorPagina = 10;
        this.paginas = [];
    }
    ngOnInit() {
        this.carregarEstados();
    }
    carregarEstados() {
        this.estadoService.listar().subscribe(dados => {
            this.estados = dados;
            this.atualizarPaginas();
        });
    }
    atualizarPaginas() {
        const totalPaginas = Math.ceil(this.estados.length / this.itensPorPagina);
        this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
    }
    get estadosPaginados() {
        const inicio = this.paginaAtual * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        return this.estados.slice(inicio, fim);
    }
    get exibicaoInicio() {
        return this.estados.length === 0 ? 0 : this.paginaAtual * this.itensPorPagina + 1;
    }
    get exibicaoFim() {
        const fim = (this.paginaAtual + 1) * this.itensPorPagina;
        return fim > this.estados.length ? this.estados.length : fim;
    }
    get totalItens() {
        return this.estados.length;
    }
    mudarPagina(pagina) {
        const totalPaginas = Math.ceil(this.estados.length / this.itensPorPagina);
        if (pagina >= 0 && pagina < totalPaginas) {
            this.paginaAtual = pagina;
        }
    }
    novoEstado() {
        this.router.navigate(['/home/_cad/estadosForm']);
    }
    editarEstado(id) {
        this.router.navigate(['home/_cad/estadosForm', id]);
    }
    excluirEstado(id, nome) {
        Swal.fire({
            title: 'Excluir estado?',
            html: `Tem certeza que deseja excluir <strong>${nome}</strong>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-trash"></i> Sim, excluir',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33'
        }).then(result => {
            if (result.isConfirmed) {
                this.estadoService.excluir(id).subscribe(() => {
                    Swal.fire('Excluído!', 'O estado foi removido com sucesso.', 'success');
                    this.carregarEstados();
                });
            }
        });
    }
};
EstadosListComponent = __decorate([
    Component({
        selector: 'app-estados-list',
        templateUrl: './estados-list.component.html',
        styleUrls: ['./estados-list.component.css']
    })
], EstadosListComponent);
export { EstadosListComponent };
//# sourceMappingURL=estados-list.component.js.map