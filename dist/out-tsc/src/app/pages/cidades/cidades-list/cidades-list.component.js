import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
let CidadesListComponent = class CidadesListComponent {
    constructor(cidadeService, router, http) {
        this.cidadeService = cidadeService;
        this.router = router;
        this.http = http;
        this.cidades = [];
        this.cidadesPaginadas = [];
        // Paginação
        this.paginaAtual = 0;
        this.itensPorPagina = 10;
        this.paginas = [];
    }
    ngOnInit() {
        this.carregarCidades();
    }
    carregarCidades() {
        this.cidadeService.listar().subscribe(data => {
            this.cidades = data || [];
            this.paginaAtual = 0; // resetar para a primeira página ao recarregar dados
            this.atualizarPaginacao();
        });
    }
    novaCidade() {
        this.router.navigate(['/home/_cad/cidadesForm']);
    }
    editarCidade(id) {
        this.router.navigate(['/home/_cad/cidadesForm', id]);
    }
    excluirCidade(cidade) {
        Swal.fire({
            title: 'Excluir cidade?',
            html: `Tem certeza que deseja excluir <strong>${cidade.nomeCidade}</strong>?`,
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
                this.http.delete(`${environment.apiBaseUrl}/cidades/${cidade.idCidade}`).subscribe({
                    next: () => {
                        this.carregarCidades();
                        Swal.fire({
                            title: 'Excluída!',
                            text: `A cidade ${cidade.nomeCidade} foi removida com sucesso.`,
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
    atualizarPaginacao() {
        const totalPaginas = Math.max(1, Math.ceil(this.cidades.length / this.itensPorPagina));
        this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
        // ajustar paginaAtual se por acaso for maior que totalPaginas - 1
        if (this.paginaAtual >= totalPaginas) {
            this.paginaAtual = totalPaginas - 1;
        }
        const inicio = this.paginaAtual * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        this.cidadesPaginadas = this.cidades.slice(inicio, fim);
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
        if (this.cidades.length === 0)
            return 0;
        return this.paginaAtual * this.itensPorPagina + 1;
    }
    get exibicaoFim() {
        if (this.cidades.length === 0)
            return 0;
        return Math.min((this.paginaAtual + 1) * this.itensPorPagina, this.cidades.length);
    }
    get totalItens() {
        return this.cidades.length;
    }
};
CidadesListComponent = __decorate([
    Component({
        selector: 'app-cidades-list',
        templateUrl: './cidades-list.component.html',
        styleUrls: ['./cidades-list.component.css']
    })
], CidadesListComponent);
export { CidadesListComponent };
//# sourceMappingURL=cidades-list.component.js.map