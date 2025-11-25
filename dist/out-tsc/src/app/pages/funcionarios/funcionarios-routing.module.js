import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FuncionariosListComponent } from './funcionarios-list/funcionarios-list.component';
import { FuncionarioFormComponent } from './funcionarios-form/funcionarios-form.component';
const routes = [
    { path: 'funcionariosListar', component: FuncionariosListComponent },
    { path: 'funcionariosForm', component: FuncionarioFormComponent },
    { path: 'funcionariosForm/:id', component: FuncionarioFormComponent }
];
let FuncionariosRoutingModule = class FuncionariosRoutingModule {
};
FuncionariosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], FuncionariosRoutingModule);
export { FuncionariosRoutingModule };
//# sourceMappingURL=funcionarios-routing.module.js.map