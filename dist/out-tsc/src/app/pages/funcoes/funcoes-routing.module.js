import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuncoesListComponent } from './funcoes-list/funcoes-list.component';
import { FuncoesFormComponent } from './funcoes-form/funcoes-form.component';
const routes = [
    { path: 'funcoesListar', component: FuncoesListComponent },
    { path: 'funcoesForm', component: FuncoesFormComponent },
    { path: 'funcoesForm/:id', component: FuncoesFormComponent }
];
let FuncoesRoutingModule = class FuncoesRoutingModule {
};
FuncoesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], FuncoesRoutingModule);
export { FuncoesRoutingModule };
//# sourceMappingURL=funcoes-routing.module.js.map