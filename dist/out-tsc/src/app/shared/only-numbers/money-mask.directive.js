import { __decorate } from "tslib";
import { Directive, HostListener, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
let MoneyMaskDirective = class MoneyMaskDirective {
    constructor(el) {
        this.el = el;
        this.onChange = (_) => { };
        this.onTouched = () => { };
    }
    writeValue(value) {
        if (value !== undefined && value !== null) {
            this.el.nativeElement.value = this.formatar(value);
        }
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    onInput(event) {
        let value = event.target.value.replace(/\D/g, '');
        if (!value) {
            this.el.nativeElement.value = '';
            this.onChange(0);
            return;
        }
        const numberValue = (parseInt(value) / 100);
        const formatted = this.formatar(numberValue);
        this.el.nativeElement.value = formatted;
        this.onChange(numberValue);
    }
    formatar(v) {
        return `R$ ${v.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })}`;
    }
};
__decorate([
    HostListener('input', ['$event'])
], MoneyMaskDirective.prototype, "onInput", null);
MoneyMaskDirective = __decorate([
    Directive({
        selector: '[moneyMask]',
        providers: [{
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => MoneyMaskDirective),
                multi: true
            }]
    })
], MoneyMaskDirective);
export { MoneyMaskDirective };
//# sourceMappingURL=money-mask.directive.js.map