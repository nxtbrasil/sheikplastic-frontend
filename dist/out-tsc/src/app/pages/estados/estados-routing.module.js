import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EstadosListComponent } from './estados-list/estados-list.component';
import { EstadosFormComponent } from './estados-form/estados-form.component';
const routes = [
    { path: 'estadosListar', component: EstadosListComponent },
    { path: 'estadosForm', component: EstadosFormComponent },
    { path: 'estadosForm/:id', component: EstadosFormComponent }
];
let EstadosRoutingModule = class EstadosRoutingModule {
};
EstadosRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], EstadosRoutingModule);
export { EstadosRoutingModule };
//# sourceMappingURL=estados-routing.module.js.map