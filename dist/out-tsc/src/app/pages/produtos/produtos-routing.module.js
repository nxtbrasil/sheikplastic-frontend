import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
const routes = [
    { path: 'produtosListar', component: ProdutosListComponent },
    { path: 'produtosForm', component: ProdutosFormComponent },
    { path: 'produtosForm/:id', component: ProdutosFormComponent }
];
let ProdutosRoutingModule = class ProdutosRoutingModule {
};
ProdutosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], ProdutosRoutingModule);
export { ProdutosRoutingModule };
//# sourceMappingURL=produtos-routing.module.js.map