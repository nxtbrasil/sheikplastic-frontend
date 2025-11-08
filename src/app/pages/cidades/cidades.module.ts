import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CidadesRoutingModule } from './cidades-routing.module';
import { CidadesListComponent } from './cidades-list/cidades-list.component';
import { CidadesFormComponent } from './cidades-form/cidades-form.component';


@NgModule({
  declarations: [
    CidadesListComponent,
    CidadesFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CidadesRoutingModule
  ]
})
export class CidadesModule { }
