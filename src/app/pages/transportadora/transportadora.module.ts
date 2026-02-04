import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TransportadoraListComponent } from './transportadora-list/transportadora-list.component';
import { TransportadoraFormComponent } from './transportadora-form/transportadora-form.component';
import { TransportadoraRoutingModule } from './transportadora-routing.module';

@NgModule({
  declarations: [
    TransportadoraListComponent,
    TransportadoraFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TransportadoraRoutingModule
  ]
})
export class TransportadoraModule {}
