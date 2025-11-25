import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';
const routes = [
    { path: 'pessoasListar', component: PessoaListComponent },
    { path: 'pessoasForm', component: PessoaFormComponent },
    { path: 'pessoasForm/:id', component: PessoaFormComponent }
];
let PessoaRoutingModule = class PessoaRoutingModule {
};
PessoaRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], PessoaRoutingModule);
export { PessoaRoutingModule };
//# sourceMappingURL=pessoa-routing.module.js.map