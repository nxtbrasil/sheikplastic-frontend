import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncoesRoutingModule } from './funcoes-routing.module';
import { FuncoesListComponent } from './funcoes-list/funcoes-list.component';
import { FuncoesFormComponent } from './funcoes-form/funcoes-form.component';
let FuncoesModule = class FuncoesModule {
};
FuncoesModule = __decorate([
    NgModule({
        declarations: [
            FuncoesListComponent,
            FuncoesFormComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            FuncoesRoutingModule
        ]
    })
], FuncoesModule);
export { FuncoesModule };
//# sourceMappingURL=funcoes.module.js.map