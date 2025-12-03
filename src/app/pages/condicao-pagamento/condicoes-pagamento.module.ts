import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CondicoesPagamentoListComponent } from './condicoes-pagamento-list/condicoes-pagamento-list.component';
import { CondicoesPagamentoFormComponent } from './condicoes-pagamento-form/condicoes-pagamento-form.component';
import { CondicaoPagamentoRoutingModule } from './condicoes-pagamento-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CondicoesPagamentoListComponent,
    CondicoesPagamentoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CondicaoPagamentoRoutingModule
  ]
})
export class CondicoesPagamentoModule { }
