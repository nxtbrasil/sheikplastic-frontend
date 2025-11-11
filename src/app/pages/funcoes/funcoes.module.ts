import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FuncoesRoutingModule } from './funcoes-routing.module';
import { FuncoesListComponent } from './funcoes-list/funcoes-list.component';
import { FuncoesFormComponent } from './funcoes-form/funcoes-form.component';

@NgModule({
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
export class FuncoesModule {}
