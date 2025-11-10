import { Component, OnInit } from '@angular/core';
import { CondicaoPagamento } from '../condicao-pagamento.model';
import { CondicaoPagamentoService } from '../condicao-pagamento.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-condicoes-pagamento-list',
  templateUrl: './condicoes-pagamento-list.component.html',
  styleUrls: ['./condicoes-pagamento-list.component.css']
})
export class CondicoesPagamentoListComponent implements OnInit {
  condicoes: CondicaoPagamento[] = [];
  condicoesPaginas: CondicaoPagamento[] = [];

  // Paginação
  paginaAtual = 0;
  itensPorPagina = 10;
  paginas: number[] = [];

  exibicaoInicio = 0;
  exibicaoFim = 0;
  totalItens = 0;

  constructor(private service: CondicaoPagamentoService, private router: Router) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.service.listar().subscribe({
      next: dados => {
        this.condicoes = dados;
        this.totalItens = this.condicoes.length;
        this.configurarPaginacao();
      },
      error: () => Swal.fire('Erro', 'Falha ao carregar lista', 'error')
    });
  }

  configurarPaginacao(): void {
    const totalPaginas = Math.ceil(this.condicoes.length / this.itensPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
    this.mudarPagina(0);
  }

  mudarPagina(pagina: number): void {
    if (pagina < 0 || pagina >= this.paginas.length) return;

    this.paginaAtual = pagina;
    const inicio = pagina * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;

    this.condicoesPaginas = this.condicoes.slice(inicio, fim);

    this.exibicaoInicio = this.condicoes.length ? inicio + 1 : 0;
    this.exibicaoFim = Math.min(fim, this.condicoes.length);
  }

  novo(): void {
    this.router.navigate(['home/_cad/condicoesPagamentoForm']);
  }

  editar(id: number): void {
    this.router.navigate(['home/_cad/condicoesPagamentoForm', id]);
  }

  excluir(id: number): void {
    Swal.fire({
      title: 'Excluir?',
      text: 'Deseja realmente excluir esta condição?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.service.excluir(id).subscribe({
          next: () => {
            Swal.fire('Excluído!', 'Condição removida.', 'success');
            this.listar();
          },
          error: () => Swal.fire('Erro', 'Falha ao excluir', 'error')
        });
      }
    });
  }
}
