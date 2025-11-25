import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { Pessoa } from '../pessoa.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.css']
})
export class PessoaListComponent implements OnInit {
  pessoas: Pessoa[] = [];
  pessoasFiltradas: Pessoa[] = [];
    pessoasPaginadas: Pessoa[] = [];

      // Paginação
  paginaAtual = 0;
  itensPorPagina = 10;
  paginas: number[] = [];

  filtroNome: string = '';

  loading = false;
  error?: string;

  constructor(
    private service: PessoaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.loading = true;

    this.service.listar().subscribe({
      next: data => {
        this.pessoas = data;
        this.pessoasFiltradas = data;
        this.loading = false;
          this.paginaAtual = 0; // resetar para a primeira página ao recarregar dados
        this.atualizarPaginacao();
      },
      error: () => {
        this.error = 'Erro ao carregar pessoas';
        this.loading = false;
      }
    });
  }

 filtrar() {
  const termo = this.filtroNome.toLowerCase().trim();

  this.pessoasFiltradas = this.pessoas.filter(p =>
    p.nome.toLowerCase().includes(termo)
  );
  this.atualizarPaginacao();
}

limparFiltro() {
  this.filtroNome = '';
  this.pessoasFiltradas = [...this.pessoas];
  this.atualizarPaginacao();
}

  novo() {
    this.router.navigate(['/home/_cad/pessoasForm']);
  }

  editar(id: number) {
    this.router.navigate(['/home/_cad/pessoasForm', id]);
  }

  // excluir(id: number) {
  //   if (!confirm('Excluir pessoa?')) return;

  //   this.service.remover(id).subscribe({
  //     next: () => this.carregar(),
  //     error: () => alert('Erro ao excluir')
  //   });
  // }



   excluir(pessoa: any): void {
    Swal.fire({
      title: 'Excluir Pessoa?',
      html: `Tem certeza que deseja excluir <strong>${pessoa.nome}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-trash"></i> Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Excluindo...',
          html: 'Por favor, aguarde enquanto a pessoa é removida.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
  
        this.service.remover(pessoa.id).subscribe({
          next: () => {
            this.carregar();
            Swal.fire({
              title: 'Excluída!',
              text: `A cidade ${pessoa.nome} foi removida com sucesso.`,
              icon: 'success',
              confirmButtonColor: '#198754',
              timer: 1800,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Erro ao excluir cidade:', err);
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível excluir a cidade.',
              icon: 'error',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }
    });
  }


   atualizarPaginacao(): void {
    const totalPaginas = Math.max(1, Math.ceil(this.pessoasFiltradas.length / this.itensPorPagina));
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);

    // ajustar paginaAtual se por acaso for maior que totalPaginas - 1
    if (this.paginaAtual >= totalPaginas) {
      this.paginaAtual = totalPaginas - 1;
    }

    const inicio = this.paginaAtual * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.pessoasPaginadas = this.pessoasFiltradas.slice(inicio, fim);

  }

   mudarPagina(pagina: number): void {
    if (pagina < 0) {
      pagina = 0;
    }
    if (pagina >= this.paginas.length) {
      pagina = this.paginas.length - 1;
    }
    if (pagina === this.paginaAtual) return;
    this.paginaAtual = pagina;
    this.atualizarPaginacao();
  }

  // Métodos para exibição segura do range
  get exibicaoInicio(): number {
    if (this.pessoasFiltradas.length === 0) return 0;
    return this.paginaAtual * this.itensPorPagina + 1;
  }

  get exibicaoFim(): number {
    if (this.pessoasFiltradas.length === 0) return 0;
    return Math.min((this.paginaAtual + 1) * this.itensPorPagina, this.pessoasFiltradas.length);
  }

  get totalItens(): number {
    return this.pessoasFiltradas.length;
  }

}
