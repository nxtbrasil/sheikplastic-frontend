import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TipoContatoRoutingModule } from './tipo-contato-routing.module';
import { TipoContatoListComponent } from './tipo-contato-list/tipo-contato-list.component';
import { TipoContatoFormComponent } from './tipo-contato-form/tipo-contato-form.component';
let TipoContatoModule = class TipoContatoModule {
};
TipoContatoModule = __decorate([
    NgModule({
        declarations: [
            TipoContatoListComponent,
            TipoContatoFormComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            TipoContatoRoutingModule
        ]
    })
], TipoContatoModule);
export { TipoContatoModule };
//# sourceMappingURL=tipo-contato.module.js.map