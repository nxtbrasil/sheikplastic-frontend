import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosListComponent } from './funcionarios-list/funcionarios-list.component';
import { FuncionarioFormComponent } from './funcionarios-form/funcionarios-form.component';

const routes: Routes = [
  { path: 'funcionariosListar', component: FuncionariosListComponent },
  { path: 'funcionariosForm', component: FuncionarioFormComponent },
  { path: 'funcionariosForm/:id', component: FuncionarioFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionariosRoutingModule {}
