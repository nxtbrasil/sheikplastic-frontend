import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TipoContatoRoutingModule } from './tipo-contato-routing.module';
import { TipoContatoListComponent } from './tipo-contato-list/tipo-contato-list.component';
import { TipoContatoFormComponent } from './tipo-contato-form/tipo-contato-form.component';

@NgModule({
  declarations: [
    TipoContatoListComponent,
    TipoContatoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TipoContatoRoutingModule
  ]
})
export class TipoContatoModule {}
