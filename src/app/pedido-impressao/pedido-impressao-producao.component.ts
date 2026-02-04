import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from '../pages/pedidos/pedido.service';


@Component({
    selector: 'app-pedido-impressao-producao',
    templateUrl: './pedido-impressao-producao.component.html',
    styleUrls: ['./pedido-impressao-producao.component.css']
})
export class PedidoImpressaoProducaoComponent implements OnInit {

    pedido: any;
    itens: any[] = [];
    idPedido!: number;

    loading = true;
    error: string | null = null;

    constructor(
        private route: ActivatedRoute,
        private pedidoService: PedidoService
    ) { }

    ngOnInit(): void {
        this.idPedido = Number(this.route.snapshot.paramMap.get('idPedido'));

        if (!this.idPedido) {
            this.error = 'Pedido inválido';
            this.loading = false;
            return;
        }

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

    get mostrarColunaUNP(): boolean {
        return this.itens?.some(i => i.unpItem !== i.unvItem);
    }


}
