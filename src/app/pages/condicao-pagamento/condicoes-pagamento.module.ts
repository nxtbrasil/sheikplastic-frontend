import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CondicoesPagamentoRoutingModule } from './condicoes-pagamento-routing.module';
import { CondicoesPagamentoListComponent } from './condicoes-pagamento-list/condicoes-pagamento-list.component';
import { CondicoesPagamentoFormComponent } from './condicoes-pagamento-form/condicoes-pagamento-form.component';

@NgModule({
  declarations: [
    CondicoesPagamentoListComponent,
    CondicoesPagamentoFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CondicoesPagamentoRoutingModule
  ]
})
export class CondicoesPagamentoModule {}
