import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../pages/pedidos/pedido.service';
import { PedidoItemService } from '../pages/pedidos/pedidos-itens/pedido-item.service';


@Component({
  selector: 'app-pedido-impressao',
  templateUrl: './pedido-impressao.component.html',
  styleUrls: ['./pedido-impressao.component.css']
})
export class PedidoImpressaoComponent implements OnInit {

  idPedido!: number;
  itens: any[] = [];
  pedido: any;
  now = new Date();

  constructor(
    private route: ActivatedRoute,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.idPedido = Number(this.route.snapshot.paramMap.get('idPedido'));
    document.body.classList.add('print-mode');

    this.carregarDados();
  }

carregarDados() {
  this.pedidoService.listarItensImpressao(this.idPedido)
    .subscribe((res: any) => {
      this.itens = res.itens;
      this.pedido = res.pedido;

      setTimeout(() => {
        window.print();
      }, 500);
    });
}

ngOnDestroy() {
  document.body.classList.remove('print-mode');
}

}
