import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CidadesRoutingModule } from './cidades-routing.module';
import { CidadesListComponent } from './cidades-list/cidades-list.component';
import { CidadesFormComponent } from './cidades-form/cidades-form.component';
let CidadesModule = class CidadesModule {
};
CidadesModule = __decorate([
    NgModule({
        declarations: [
            CidadesListComponent,
            CidadesFormComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            CidadesRoutingModule
        ]
    })
], CidadesModule);
export { CidadesModule };
//# sourceMappingURL=cidades.module.js.map