import { Directive, HostListener, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[moneyMask]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MoneyMaskDirective),
    multi: true
  }]
})
export class MoneyMaskDirective implements ControlValueAccessor {

  private onChange = (_: any) => {};
  private onTouched = () => {};

  constructor(private el: ElementRef<HTMLInputElement>) {}

  writeValue(value: any): void {
    if (value !== undefined && value !== null) {
      this.el.nativeElement.value = this.formatar(value);
    }
  }

  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  @HostListener('input', ['$event'])
  onInput(event: any): void {
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

  formatar(v: number): string {
    return `R$ ${v.toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  }
}
