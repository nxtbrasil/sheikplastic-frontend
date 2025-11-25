import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let FuncoesListComponent = class FuncoesListComponent {
    constructor(funcoesService, router) {
        this.funcoesService = funcoesService;
        this.router = router;
        this.funcoes = [];
    }
    ngOnInit() {
        this.carregarFuncoes();
    }
    carregarFuncoes() {
        this.funcoesService.listar().subscribe(data => {
            this.funcoes = data;
        });
    }
    novaFuncao() {
        this.router.navigate(['/home/_cad/funcoesForm']);
    }
    editarFuncao(id) {
        this.router.navigate(['/home/_cad/funcoesForm', id]);
    }
    excluirFuncao(funcao) {
        Swal.fire({
            title: 'Excluir Função?',
            html: `Tem certeza que deseja excluir <strong>${funcao.nomeFuncao}</strong>?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: '<i class="fa-solid fa-trash"></i> Sim, excluir',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33'
        }).then(result => {
            if (result.isConfirmed) {
                this.funcoesService.excluir(funcao.idFuncao).subscribe(() => {
                    Swal.fire('Excluído!', 'A função foi removida.', 'success');
                    this.carregarFuncoes();
                });
            }
        });
    }
};
FuncoesListComponent = __decorate([
    Component({
        selector: 'app-funcoes-list',
        templateUrl: './funcoes-list.component.html',
        styleUrls: ['./funcoes-list.component.css']
    })
], FuncoesListComponent);
export { FuncoesListComponent };
//# sourceMappingURL=funcoes-list.component.js.map