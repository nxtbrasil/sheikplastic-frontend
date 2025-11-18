import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumbersDirective } from './only-numbers/only-numbers.directive';
import { MoneyMaskDirective } from './only-numbers/money-mask.directive';
@NgModule({
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
export class SharedModule { }