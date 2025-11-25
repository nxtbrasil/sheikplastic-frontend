import { __decorate } from "tslib";
import { Directive, HostListener } from '@angular/core';
let OnlyNumbersDirective = class OnlyNumbersDirective {
    constructor(el) {
        this.el = el;
        this.specialKeys = [
            'Backspace', 'Delete', 'Tab', 'Enter', 'Escape', 'Home',
            'End', 'ArrowLeft', 'ArrowRight', 'Clear', 'Copy', 'Paste'
        ];
        this.inputElement = el.nativeElement;
    }
    // Ao pressionar teclas que produzem ou não produzem um caractere
    onKeyDown(e) {
        if (this.specialKeys.indexOf(e.key) > -1 || // Permite specialKeys: backspace, delete, arrows etc.
            (e.key === 'a' && e.ctrlKey === true) || // Permite: Ctrl+A
            (e.key === 'c' && e.ctrlKey === true) || // Permite: Ctrl+C
            (e.key === 'v' && e.ctrlKey === true) || // Permite: Ctrl+V
            (e.key === 'x' && e.ctrlKey === true) || // Permite: Ctrl+X
            (e.key === 'a' && e.metaKey === true) || // Permite: Cmd+A (Mac)
            (e.key === 'c' && e.metaKey === true) || // Permite: Cmd+C (Mac)
            (e.key === 'v' && e.metaKey === true) || // Permite: Cmd+V (Mac)
            (e.key === 'x' && e.metaKey === true) // Permite: Cmd+X (Mac)
        ) {
            // Ok
            return;
        }
        /**
         * Verificando se a tecla não é um número
         * (e.keyCode < 48 || e.keyCode > 57) -> Não é um número da parte superior do teclado
         * (e.keyCode < 96 || e.keyCode > 105) -> Não é um número do teclado numérico
         */
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            // Cancela o pressionamento da tecla
            e.preventDefault();
        }
    }
    // Ao pressionar teclas que produzem um caractere
    onKeyPress(e) {
        // Bloqueia caracteres como: !@#$%¨&*()/
        const charCode = (e.which) ? e.which : e.keyCode;
        if ((e.shiftKey || (charCode < 48 || charCode > 57)) && (charCode < 96 || charCode > 105)) {
            // Cancela o pressionamento da tecla
            e.preventDefault();
        }
    }
    // Ao colar valor
    onPaste(event) {
        event.preventDefault();
        const pastedInput = event.clipboardData
            .getData('text/plain')
            .replace(/\D/g, ''); // Remove caracteres não numéricos
        document.execCommand('insertText', false, pastedInput);
    }
    // Ao arrastar valor
    onDrop(event) {
        event.preventDefault();
        const textData = event.dataTransfer.getData('text').replace(/\D/g, '');
        this.inputElement.focus();
        document.execCommand('insertText', false, textData);
    }
};
__decorate([
    HostListener('keydown', ['$event'])
], OnlyNumbersDirective.prototype, "onKeyDown", null);
__decorate([
    HostListener('keypress', ['$event'])
], OnlyNumbersDirective.prototype, "onKeyPress", null);
__decorate([
    HostListener('paste', ['$event'])
], OnlyNumbersDirective.prototype, "onPaste", null);
__decorate([
    HostListener('drop', ['$event'])
], OnlyNumbersDirective.prototype, "onDrop", null);
OnlyNumbersDirective = __decorate([
    Directive({
        selector: '[appOnlyNumbers]'
    })
], OnlyNumbersDirective);
export { OnlyNumbersDirective };
//# sourceMappingURL=only-numbers.directive.js.map