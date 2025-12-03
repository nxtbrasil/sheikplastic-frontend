import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncoesListComponent } from './funcoes-list/funcoes-list.component';
import { FuncoesFormComponent } from './funcoes-form/funcoes-form.component';

const routes: Routes = [
  { path: '', component: FuncoesListComponent },
  { path: 'form', component: FuncoesFormComponent },
  { path: 'form/:id', component: FuncoesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncoesRoutingModule {}
