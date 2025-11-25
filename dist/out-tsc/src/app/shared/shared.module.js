import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumbersDirective } from './only-numbers/only-numbers.directive';
import { MoneyMaskDirective } from './only-numbers/money-mask.directive';
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    NgModule({
        declarations: [
            OnlyNumbersDirective,
            MoneyMaskDirective
        ],
        imports: [
            CommonModule
        ],
        exports: [
            OnlyNumbersDirective,
            MoneyMaskDirective
        ]
    })
], SharedModule);
export { SharedModule };
//# sourceMappingURL=shared.module.js.map