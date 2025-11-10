import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadosRoutingModule } from './estados-routing.module';
import { EstadosListComponent } from './estados-list/estados-list.component';
import { EstadosFormComponent } from './estados-form/estados-form.component';

@NgModule({
  declarations: [
    EstadosListComponent,
    EstadosFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    EstadosRoutingModule
  ]
})
export class EstadosModule { }
