import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstadosListComponent } from './estados-list/estados-list.component';
import { EstadosFormComponent } from './estados-form/estados-form.component';

const routes: Routes = [
  { path: 'estadosListar', component: EstadosListComponent },
  { path: 'estadosForm', component: EstadosFormComponent },
  { path: 'estadosForm/:id', component: EstadosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstadosRoutingModule { }
