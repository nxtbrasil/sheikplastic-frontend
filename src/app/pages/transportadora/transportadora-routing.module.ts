import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TransportadoraListComponent } from './transportadora-list/transportadora-list.component';
import { TransportadoraFormComponent } from './transportadora-form/transportadora-form.component';

const routes: Routes = [
  { path: '', component: TransportadoraListComponent },
  { path: 'nova', component: TransportadoraFormComponent },
  { path: 'editar/:id', component: TransportadoraFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportadoraRoutingModule {}
