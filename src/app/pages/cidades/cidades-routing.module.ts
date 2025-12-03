import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CidadesListComponent } from './cidades-list/cidades-list.component';
import { CidadesFormComponent } from './cidades-form/cidades-form.component';

const routes: Routes = [
  { path: '', component: CidadesListComponent },
  { path: 'form', component: CidadesFormComponent },
  { path: 'form/:id', component: CidadesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CidadesRoutingModule {}
