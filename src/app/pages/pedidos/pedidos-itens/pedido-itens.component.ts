import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoItem } from './pedido-item.model';
import { PedidoItemService } from './pedido-item.service';


@Component({
  selector: 'app-pedido-itens',
  templateUrl: './pedido-itens.component.html',
    styleUrls: ['./pedido-itens.component.css']
})
export class PedidoItensComponent implements OnInit {

    pedido!: any;
    itens: PedidoItem[] = [];
    
  loading = false;

  pedidoId!: number;
  pessoaId!: number;

  totalPedido = 0;
  totalEntregue = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PedidoItemService
  ) {}

  ngOnInit(): void {

        this.pedidoId = Number(this.route.snapshot.paramMap.get('id'));
        this.pessoaId = Number(this.route.snapshot.paramMap.get('idPessoa'));
        
    this.carregarItens();
  }

carregarItens(): void {
    this.loading = true;

    this.service.listarPorPedido(this.pedidoId).subscribe({
      next: res => {
        this.itens = res.itens;
        this.pedido = res.pedido;

        this.totalPedido = res.pedido.valorPedido;
        this.totalEntregue = res.pedido.valorEntregue;

        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Erro', 'Erro ao carregar itens do pedido', 'error');
      }
    });
  }

calcularTotais(): void {
    console.log('Pedido:', this.pedido);
  this.totalPedido = this.pedido.valorPedido;
  this.totalEntregue = this.pedido.valorEntregue;
}

  novoItem(): void {
    this.router.navigate(['home/pedidosItens', this.pessoaId, this.pedidoId, 'novo']);
  }

  editar(item: PedidoItem): void {
    this.router.navigate(['home/pedidosItens', this.pessoaId, this.pedidoId, item.seqProduto]);
  }

  excluir(item: PedidoItem): void {
    Swal.fire({
      title: 'Excluir item?',
      text: 'Essa ação não poderá ser desfeita',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.excluir(  this.pessoaId, this.pedidoId, item.seqProduto).subscribe(() => {
          Swal.fire('Excluído!', 'Item removido com sucesso', 'success');
          this.carregarItens();
        });
      }
    });
  }

  cancelar(): void {
    this.router.navigate(['/home/pedidos']);
  } 

}
