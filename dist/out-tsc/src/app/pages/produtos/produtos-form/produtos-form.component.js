import { __decorate } from "tslib";
import { Component } from '@angular/core';
let ProdutosFormComponent = class ProdutosFormComponent {
    constructor(service, router, route) {
        this.service = service;
        this.router = router;
        this.route = route;
        this.produto = {
            idProduto: 0,
            nomeProduto: '',
            valorCompra: 0,
            valorVenda: 0,
            unidadeProduto: ''
        };
    }
    ngOnInit() {
        this.id = Number(this.route.snapshot.params['id']);
        if (this.id) {
            this.service.buscarPorId(this.id).subscribe({
                next: (p) => {
                    this.produto = p;
                    // Diretiva automaticamente formata quando o writeValue é chamado
                },
                error: (err) => console.error('Erro ao buscar produto', err)
            });
        }
    }
    salvar() {
        const obs = this.id
            ? this.service.atualizar(this.produto)
            : this.service.salvar(this.produto);
        obs.subscribe({
            next: () => this.router.navigate(['/home/_cad/produtosListar']),
            error: (err) => console.error('Erro ao salvar produto', err)
        });
    }
    formatarValor(valor) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(valor);
    }
};
ProdutosFormComponent = __decorate([
    Component({
        selector: 'app-produtos-form',
        templateUrl: './produtos-form.component.html',
        styleUrls: ['./produtos-form.component.css']
    })
], ProdutosFormComponent);
export { ProdutosFormComponent };
//# sourceMappingURL=produtos-form.component.js.map