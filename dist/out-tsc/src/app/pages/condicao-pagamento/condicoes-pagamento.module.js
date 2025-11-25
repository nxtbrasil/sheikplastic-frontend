import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CondicoesPagamentoRoutingModule } from './condicoes-pagamento-routing.module';
import { CondicoesPagamentoListComponent } from './condicoes-pagamento-list/condicoes-pagamento-list.component';
import { CondicoesPagamentoFormComponent } from './condicoes-pagamento-form/condicoes-pagamento-form.component';
let CondicoesPagamentoModule = class CondicoesPagamentoModule {
};
CondicoesPagamentoModule = __decorate([
    NgModule({
        declarations: [
            CondicoesPagamentoListComponent,
            CondicoesPagamentoFormComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            CondicoesPagamentoRoutingModule
        ]
    })
], CondicoesPagamentoModule);
export { CondicoesPagamentoModule };
//# sourceMappingURL=condicoes-pagamento.module.js.map