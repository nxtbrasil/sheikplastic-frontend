import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PedidosListaComponent } from './pedidos-lista.component';
import { PedidoFormComponent } from './pedidos-form/pedido-form.component';
import { PedidoItensComponent } from './pedidos-itens/pedido-itens.component';
import { PedidoItensFormComponent } from './pedidos-itens/pedido-itens-form.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    PedidosListaComponent,
    PedidoFormComponent,
    PedidoItensComponent,
    PedidoItensFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule
  ]
})
export class PedidosModule {}
