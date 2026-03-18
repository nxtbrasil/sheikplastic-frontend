import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PedidoService } from './pedido.service';
import { PessoaService } from '../pessoa/pessoa.service';
import { from, of } from 'rxjs';
import { mergeMap, toArray, catchError, map } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';


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
    private servicePessoa: PessoaService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
    this.carregarVendedores();
    this.buscar(); // Carrega a grid inicial já usando a lógica oficial
  }

  carregarVendedores() {
    this.service.listarFuncionarios().subscribe({
      next: (data) => {
        this.vendedores = data.sort((a, b) => a.nome.localeCompare(b.nome));
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
        this.pedidos = data.map((p: any) => ({
          ...p,
          ativo: p.ativo === true || p.ativo === 1 || p.ativo === 'S',
          temItensEntregues: p.temItensEntregues === 1 || p.temItensEntregues === true
        }));

        this.pedidosFiltrados = this.pedidos;
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
    dtEntregaFim: null,
    ordenacao: 'idPedido'
  };

  this.buscar();
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
  this.loading = true;

  // Criamos uma cópia para não mexer no objeto da tela
  const parametros: any = { ...this.filtro };

  Object.keys(parametros).forEach(key => {
    const valor = parametros[key];

    // Limpeza aprimorada: remove se for null, undefined, string vazia ou a string "null"
    if (
      valor === null || 
      valor === undefined || 
      valor === '' || 
      valor === 'null' || 
      (typeof valor === 'string' && valor.trim() === '')
    ) {
      delete parametros[key];
    }
  });

  // LOG de depuração: veja no console se o idPessoa aparece aqui
  console.log('Parâmetros enviados para o service:', parametros);

  this.service.listarPedidos(parametros).subscribe({
    next: data => {
      this.pedidos = data.map((p: any) => ({
        ...p,
        selecionado: false
      }));
      this.pedidosFiltrados = this.pedidos;
      this.paginaAtual = 0;
      this.selecionarTodos = false;
      this.atualizarPaginacao();
      this.loading = false;
    },
    error: (err) => {
      console.error('Erro na busca:', err);
      this.loading = false;
    }
  });
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
    const selecionados = this.pedidosPaginados.filter(p => p.selecionado);

    if (!selecionados.length) return;

    Swal.fire({
      title: `Excluir ${selecionados.length} pedido(s)?`,
      text: 'Essa ação não poderá ser desfeita e removerá todos os itens selecionados de uma vez.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir tudo',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545'
    }).then(result => {
      if (result.isConfirmed) {
        this.loading = true;

        // Criamos o array de IDs [id1, id2, id3...]
        const idsParaExcluir = selecionados.map(p => p.idPedido);

        // Chamada ÚNICA para o lote
        this.service.excluirEmLote(idsParaExcluir).subscribe({
          next: () => {
            this.loading = false;
            Swal.fire('Sucesso', 'Pedidos excluídos com sucesso!', 'success');
            this.selecionarTodos = false; // Reseta o checkbox do cabeçalho
            this.buscar(); // Recarrega a grid
          },
          error: (err) => {
            this.loading = false;
            console.error('Erro ao excluir lote:', err);
            Swal.fire('Erro', 'Não foi possível excluir os pedidos selecionados.', 'error');
          }
        });
      }
    });
  }
  imprimirProducao(idPedido: number) {
    window.open(`/#/impressao/producao/${idPedido}`, '_blank');
  }
  imprimirCliente(idPedido: number) {
    window.open(`/#/impressao/cliente/${idPedido}`, '_blank');
  }

  dataAtual(): string {
    return new Date().toISOString().substring(0, 10);
  }

  entregarPedido(p: any) {

    Swal.fire({
      title: 'Confirmar entrega?',
      text: `Deseja realmente marcar o pedido #${p.idPedido} como entregue?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sim, entregar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {

      if (!result.isConfirmed) {
        return;
      }

      this.loading = true;

      this.service.buscarPorId(p.idPedido).subscribe({
        next: (pedido) => {

          const payload = {
            idPessoa: pedido.idPessoa,
            idFuncionario: pedido.idFuncionario,
            idCondicaoPagamento: pedido.idCondicaoPagamento,

            dtEntradaPedido: this.formatarData(pedido.dtEntradaPedido),
            dtPrevisaoPedido: this.formatarData(pedido.dtPrevisaoPedido),
            dtEntregaPedido: this.dataAtual(),

            nomeSolicitante: pedido.nomeSolicitante,
            urgente: pedido.urgente ?? false,
            observacao: pedido.observacao,
            entregue: true,
            ativo: pedido.ativo ?? true
          };

          console.log("Atualizar: ", payload)

          this.service.entregarPedido(p.idPedido, payload).subscribe({
            next: () => {
              this.loading = false;

              Swal.fire({
                title: 'Entregue!',
                text: `Pedido #${p.idPedido} foi entregue com sucesso.`,
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
              });

              // 👇 AQUI está o pulo do gato
              this.filtro = {
                idPedido: p.idPedido,   // mantém só o pedido entregue
                idPessoa: null,
                idFuncionario: null,
                statusPedido: 1,        // entregue (se sua API usa isso)
                ativo: null,
                dtEntradaIni: null,
                dtEntradaFim: null,
                dtEntregaIni: null,
                dtEntregaFim: null,
                ordenacao: 'idPedido'
              };

              this.buscar(); // 🔄 recarrega a tabela filtrada
            },
            error: err => {
              this.loading = false;

              Swal.fire({
                title: 'Erro',
                text: 'Erro ao entregar o pedido.',
                icon: 'error'
              });

              console.error(err);
            }
          });
        },
        error: err => {
          this.loading = false;

          Swal.fire({
            title: 'Erro',
            text: 'Erro ao buscar dados do pedido.',
            icon: 'error'
          });

          console.error(err);
        }
      });
    });
  }
  private formatarData(data: any): string | null {
    if (!data) return null;

    if (typeof data === 'string') {
      return data.substring(0, 10);
    }

    const d = new Date(data);
    return d.toISOString().substring(0, 10);
  }

temFiltroAtivo(): boolean {
  return Object.entries(this.filtro).some(([key, value]) => {
    if (key === 'ordenacao') return false; // não conta como filtro
    return value !== null && value !== '';
  });
}


}
