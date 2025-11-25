import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PessoaListComponent } from './pessoa-list/pessoa-list.component';
import { PessoaFormComponent } from './pessoa-form/pessoa-form.component';


@NgModule({
  declarations: [
    PessoaListComponent,
    PessoaFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    PessoaRoutingModule
  ]
})
export class PessoaModule {}
