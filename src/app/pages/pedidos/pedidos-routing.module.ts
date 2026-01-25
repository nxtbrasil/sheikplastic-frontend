import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PedidosListaComponent } from './pedidos-lista.component';
import { PedidoFormComponent } from './pedidos-form/pedido-form.component';

const routes: Routes = [
  { path: '', component: PedidosListaComponent },
  { path: 'form', component: PedidoFormComponent },
  { path: 'form/:id', component: PedidoFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule {}
