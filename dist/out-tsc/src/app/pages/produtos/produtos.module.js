import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';
import { SharedModule } from '../../shared/shared.module';
let ProdutosModule = class ProdutosModule {
};
ProdutosModule = __decorate([
    NgModule({
        declarations: [
            ProdutosListComponent,
            ProdutosFormComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ProdutosRoutingModule,
            SharedModule
        ]
    })
], ProdutosModule);
export { ProdutosModule };
//# sourceMappingURL=produtos.module.js.map