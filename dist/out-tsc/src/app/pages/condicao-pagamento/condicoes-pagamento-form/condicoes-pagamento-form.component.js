import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let CondicoesPagamentoFormComponent = class CondicoesPagamentoFormComponent {
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.condicao = { idCondicaoPagamento: 0, descricaoCondicaoPagamento: '' };
    }
    ngOnInit() {
        const id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.service.buscarPorId(+id).subscribe({
                next: (dados) => this.condicao = dados,
                error: () => Swal.fire('Erro', 'Falha ao carregar dados', 'error')
            });
        }
    }
    salvar() {
        const operacao = this.condicao.idCondicaoPagamento === 0
            ? this.service.salvar(this.condicao)
            : this.service.atualizar(this.condicao.idCondicaoPagamento, this.condicao);
        operacao.subscribe({
            next: () => {
                Swal.fire('Sucesso', 'Registro salvo com sucesso!', 'success');
                this.router.navigate(['home/_cad/condicoesPagamentoListar']);
            },
            error: () => Swal.fire('Erro', 'Falha ao salvar', 'error')
        });
    }
    cancelar() {
        this.router.navigate(['home/_cad/condicoesPagamentoListar']);
    }
};
CondicoesPagamentoFormComponent = __decorate([
    Component({
        selector: 'app-condicoes-pagamento-form',
        templateUrl: './condicoes-pagamento-form.component.html',
        styleUrls: ['./condicoes-pagamento-form.component.css']
    })
], CondicoesPagamentoFormComponent);
export { CondicoesPagamentoFormComponent };
//# sourceMappingURL=condicoes-pagamento-form.component.js.map