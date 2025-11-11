import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncoesListComponent } from './funcoes-list/funcoes-list.component';
import { FuncoesFormComponent } from './funcoes-form/funcoes-form.component';

const routes: Routes = [
  { path: 'funcoesListar', component: FuncoesListComponent },
  { path: 'funcoesForm', component: FuncoesFormComponent },
  { path: 'funcoesForm/:id', component: FuncoesFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncoesRoutingModule {}
