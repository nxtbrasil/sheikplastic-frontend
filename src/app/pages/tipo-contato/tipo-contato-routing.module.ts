import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoContatoListComponent } from './tipo-contato-list/tipo-contato-list.component';
import { TipoContatoFormComponent } from './tipo-contato-form/tipo-contato-form.component';

const routes: Routes = [
  { path: 'tiposContatoListar', component: TipoContatoListComponent },
  { path: 'tiposContatoForm', component: TipoContatoFormComponent },
  { path: 'tiposContatoForm/:id', component: TipoContatoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoContatoRoutingModule {}
