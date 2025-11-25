import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CondicoesPagamentoListComponent } from './condicoes-pagamento-list/condicoes-pagamento-list.component';
import { CondicoesPagamentoFormComponent } from './condicoes-pagamento-form/condicoes-pagamento-form.component';
const routes = [
    { path: 'condicoesPagamentoListar', component: CondicoesPagamentoListComponent },
    { path: 'condicoesPagamentoForm', component: CondicoesPagamentoFormComponent },
    { path: 'condicoesPagamentoForm/:id', component: CondicoesPagamentoFormComponent }
];
let CondicoesPagamentoRoutingModule = class CondicoesPagamentoRoutingModule {
};
CondicoesPagamentoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CondicoesPagamentoRoutingModule);
export { CondicoesPagamentoRoutingModule };
//# sourceMappingURL=condicoes-pagamento-routing.module.js.map