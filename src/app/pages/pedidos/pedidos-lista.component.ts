import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from './pedido.service';
import { PessoaService } from '../pessoa/pessoa.service';

@Component({
  selector: 'app-pedidos-lista',
  templateUrl: './pedidos-lista.component.html',
  styleUrls: ['./pedidos-lista.component.css']
})
export class PedidosListaComponent implements OnInit {

  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  pedidosPaginados: any[] = [];
  vendedores: any[] = [];
  clientes: any[] = []; 
  selecionarTodos = false;

  paginaAtual = 0;
  itensPorPagina = 10;
  paginas: number[] = [];

  filtroNumero = '';
  filtroCliente = '';
  filtroVendedor = '';

  filtro: any = {
  idPedido: null,
  idPessoa: null,
  idFuncionario: null,
  statusPedido: null,
  ativo: null,
  dtEntradaIni: null,
  dtEntradaFim: null,
  dtEntregaIni: null,
  dtEntregaFim: null,
  ordenacao: 'idPedido', // Valor inicial padrão
};


  loading = false;
  error?: string;

  constructor(
    private service: PedidoService,
    private router: Router,
    private servicePessoa: PessoaService
  ) { }

  ngOnInit(): void {
    this.carregar();
      this.buscarPedidos();
      this.carregarClientes(); // Carrega o select de clientes

  }

  carregarVendedores() {
    this.service.listarFuncionarios().subscribe({
      next: (data) => { 
        this.vendedores = data;
      },
      error: (err) => console.error('Erro ao carregar vendedores', err)
    });
  } 

  itensPedido(id: number, idPessoa: number) {
    this.router.navigate(['/home/pedidosItem', id, idPessoa]);
  }

  carregarClientes() {
  this.servicePessoa.listar().subscribe({
    next: (data) => {
      // Ordenação Alfabética por nome
      this.clientes = data.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
    },
    error: (err) => console.error('Erro ao carregar clientes', err)
  });
}

  buscarPedidos() {
  this.service.listarPedidos(this.filtro).subscribe(res => {
    this.pedidos = res;
  });
}
selecionarPedido() {
  if (!this.filtro.idPedidoTexto) {
    this.filtro.idPedido = null;
    return;
  }

  const pedido = this.pedidos.find(p =>
    p.idPedido.toString() === this.filtro.idPedidoTexto
  );

  this.filtro.idPedido = pedido ? pedido.idPedido : null;
}


  carregar() {
    this.loading = true;

    this.service.listarTodos().subscribe({
      next: data => {
        // 🔥 NORMALIZAÇÃO DO ATIVO
        this.pedidos = data.map((p: any) => ({
          ...p,
          ativo: p.ativo === true || p.ativo === 1 || p.ativo === 'S'
        }));
        this.pedidosFiltrados = data;
        this.paginaAtual = 0;
        this.atualizarPaginacao();
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao carregar pedidos';
        this.loading = false;
      }
    });
  }

  filtrar() {
    this.pedidosFiltrados = this.pedidos.filter(p =>
      (!this.filtroNumero || p.numero.toString().includes(this.filtroNumero)) &&
      (!this.filtroCliente || p.cliente.toLowerCase().includes(this.filtroCliente.toLowerCase())) &&
      (!this.filtroVendedor || p.vendedor.toLowerCase().includes(this.filtroVendedor.toLowerCase()))
    );

    this.atualizarPaginacao();
  }

  limparFiltro() {
    this.filtroNumero = '';
    this.filtroCliente = '';
    this.filtroVendedor = '';
    this.pedidosFiltrados = [...this.pedidos];
    this.atualizarPaginacao();
  }

  novo() {
    this.router.navigate(['/home/pedidosForm']);
  }

  editar(id: number) {
    this.router.navigate(['/home/pedidosForm', id]);
  }

  excluir(pedido: any) {
    console.log('Excluindo pedido:', pedido.idPedido);
    Swal.fire({
      title: 'Excluir Pedido?',
      html: `Pedido <strong>#${pedido.idPedido}</strong>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545'
    }).then(res => {
      if (res.isConfirmed) {
        this.service.excluir(pedido.idPedido).subscribe(() => this.carregar());
      }
    });
  }

  atualizarPaginacao() {
    const total = Math.max(1, Math.ceil(this.pedidosFiltrados.length / this.itensPorPagina));
    this.paginas = Array.from({ length: total }, (_, i) => i);

    const inicio = this.paginaAtual * this.itensPorPagina;
    this.pedidosPaginados = this.pedidosFiltrados.slice(inicio, inicio + this.itensPorPagina);
  }

  mudarPagina(p: number) {
    if (p < 0 || p >= this.paginas.length) return;
    this.paginaAtual = p;
    this.atualizarPaginacao();
  }

  get exibicaoInicio() {
    return this.pedidosFiltrados.length ? this.paginaAtual * this.itensPorPagina + 1 : 0;
  }

  get exibicaoFim() {
    return Math.min((this.paginaAtual + 1) * this.itensPorPagina, this.pedidosFiltrados.length);
  }

  get totalItens() {
    return this.pedidosFiltrados.length;
  }
getStatusIcon(p: any): string {
  switch (p.status) {
    case 'ENTREGUE':
      return 'fa-check-circle text-success';

    case 'ATRASADO':
      return 'fa-person-running text-danger';

    case 'EM_ANDAMENTO':
      return 'fa-person-running text-warning';

    case 'NOVO':
    default:
      return 'fa-star text-primary';
      
  }
}

getStatusLabel(p: any): string {
  switch (p.status) {
    case 'ENTREGUE':
      return 'Entregue';

    case 'ATRASADO':
      return 'Atrasado';

    case 'NOVO':
    default:
      return 'Novo';
  }
}

buscar() {
  // DEBUG: Verifique se o idPedido aparece aqui antes da chamada
  console.log('Enviando filtros para API:', this.filtro);

  this.loading = true;
  this.service.listarPedidos(this.filtro).subscribe({
    next: data => {
      this.pedidosFiltrados = data.map((p: any) => ({
        ...p,
        ativo: p.ativo === true || p.ativo === 1 || p.ativo === 'S'
      }));
      this.paginaAtual = 0;
      this.atualizarPaginacao();
      this.loading = false;
    },
    error: () => {
      this.error = 'Erro ao buscar pedidos';
      this.loading = false;
    }
  });
}

limpar() {
  this.filtro = {
    idPedido: null,
    idPessoa: null,
    idFuncionario: null,
    statusPedido: null,
    ativo: null,
    dtEntradaIni: null,
    dtEntradaFim: null,
    dtEntregaIni: null,
    dtEntregaFim: null
  };

  this.buscar();
}


toggleSelecionarTodos(): void {
  this.pedidosPaginados.forEach(p => p.selecionado = this.selecionarTodos);
}

atualizarSelecionarTodos(): void {
  this.selecionarTodos =
    this.pedidosPaginados.every(p => p.selecionado);
}

temSelecionados(): boolean {
  return this.pedidosPaginados.some(p => p.selecionado);
}

excluirSelecionados(): void {

  const selecionados = this.pedidosPaginados
    .filter(p => p.selecionado);

  if (!selecionados.length) {
    return;
  }

  Swal.fire({
    title: `Excluir ${selecionados.length} pedido(s)?`,
    text: 'Essa ação não poderá ser desfeita',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sim, excluir',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.excluirRecursivo(selecionados, 0);
    }
  });
}

excluirRecursivo(lista: any[], index: number): void {

  if (index >= lista.length) {
    Swal.fire('Sucesso', 'Pedidos excluídos com sucesso', 'success');
    this.buscar(); // recarrega grid
    return;
  }

  const pedido = lista[index];

  this.service.excluir(pedido.idPedido).subscribe({
    next: () => {
      // chama o próximo
      this.excluirRecursivo(lista, index + 1);
    },
    error: () => {
      Swal.fire(
        'Erro',
        `Erro ao excluir pedido ${pedido.idPedido}`,
        'error'
      );
    }
  });
}


}
