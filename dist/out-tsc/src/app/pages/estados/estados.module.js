import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadosRoutingModule } from './estados-routing.module';
import { EstadosListComponent } from './estados-list/estados-list.component';
import { EstadosFormComponent } from './estados-form/estados-form.component';
let EstadosModule = class EstadosModule {
};
EstadosModule = __decorate([
    NgModule({
        declarations: [
            EstadosListComponent,
            EstadosFormComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            EstadosRoutingModule
        ]
    })
], EstadosModule);
export { EstadosModule };
//# sourceMappingURL=estados.module.js.map