import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutosListComponent } from './produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './produtos-form/produtos-form.component';

const routes: Routes = [
  { path: '', component: ProdutosListComponent },
  { path: 'form', component: ProdutosFormComponent },
  { path: 'form/:id', component: ProdutosFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutosRoutingModule {}
