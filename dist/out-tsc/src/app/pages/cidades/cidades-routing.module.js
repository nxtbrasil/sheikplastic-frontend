import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CidadesListComponent } from './cidades-list/cidades-list.component';
import { CidadesFormComponent } from './cidades-form/cidades-form.component';
const routes = [
    { path: 'cidadesListar', component: CidadesListComponent },
    { path: 'cidadesForm', component: CidadesFormComponent },
    { path: 'cidadesForm/:id', component: CidadesFormComponent }
];
let CidadesRoutingModule = class CidadesRoutingModule {
};
CidadesRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], CidadesRoutingModule);
export { CidadesRoutingModule };
//# sourceMappingURL=cidades-routing.module.js.map