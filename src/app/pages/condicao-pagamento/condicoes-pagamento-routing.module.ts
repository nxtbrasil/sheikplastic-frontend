import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondicoesPagamentoListComponent } from './condicoes-pagamento-list/condicoes-pagamento-list.component';
import { CondicoesPagamentoFormComponent } from './condicoes-pagamento-form/condicoes-pagamento-form.component';

const routes: Routes = [
  { path: 'condicoesPagamentoListar', component: CondicoesPagamentoListComponent },
  { path: 'condicoesPagamentoForm', component: CondicoesPagamentoFormComponent },
  { path: 'condicoesPagamentoForm/:id', component: CondicoesPagamentoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CondicoesPagamentoRoutingModule {}
