import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipoContatoListComponent } from './tipo-contato-list/tipo-contato-list.component';
import { TipoContatoFormComponent } from './tipo-contato-form/tipo-contato-form.component';

const routes: Routes = [
  { path: '', component: TipoContatoListComponent },
  { path: 'form', component: TipoContatoFormComponent },
  { path: 'form/:id', component: TipoContatoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoContatoRoutingModule {}
