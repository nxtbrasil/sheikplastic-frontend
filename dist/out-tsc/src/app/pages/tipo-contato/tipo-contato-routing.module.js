import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TipoContatoListComponent } from './tipo-contato-list/tipo-contato-list.component';
import { TipoContatoFormComponent } from './tipo-contato-form/tipo-contato-form.component';
const routes = [
    { path: 'tiposContatoListar', component: TipoContatoListComponent },
    { path: 'tiposContatoForm', component: TipoContatoFormComponent },
    { path: 'tiposContatoForm/:id', component: TipoContatoFormComponent }
];
let TipoContatoRoutingModule = class TipoContatoRoutingModule {
};
TipoContatoRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forChild(routes)],
        exports: [RouterModule]
    })
], TipoContatoRoutingModule);
export { TipoContatoRoutingModule };
//# sourceMappingURL=tipo-contato-routing.module.js.map