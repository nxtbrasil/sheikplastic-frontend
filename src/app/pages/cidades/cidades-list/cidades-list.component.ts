import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CidadeService } from '../cidade.service';
import { Cidade } from '../cidade.model';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cidades-list',
  templateUrl: './cidades-list.component.html',
  styleUrls: ['./cidades-list.component.css']
})
export class CidadesListComponent implements OnInit {
  cidades: Cidade[] = [];
  cidadesPaginadas: Cidade[] = [];

  // Paginação
  paginaAtual = 0;
  itensPorPagina = 10;
  paginas: number[] = [];

constructor(
  private cidadeService: CidadeService,
  private router: Router,
  private http: HttpClient
) {}

  ngOnInit(): void {
    this.carregarCidades();
  }

  carregarCidades(): void {
    this.cidadeService.listar().subscribe(data => {
      this.cidades = data || [];
      this.paginaAtual = 0; // resetar para a primeira página ao recarregar dados
      this.atualizarPaginacao();
    });
  }

  novaCidade(): void {
    this.router.navigate(['/home/cidadesForm']);
  }

  editarCidade(id: number): void {
    this.router.navigate(['/home/cidadesForm', id]);
  }


  excluirCidade(cidade: Cidade): void {
  Swal.fire({
    title: 'Excluir cidade?',
    html: `Tem certeza que deseja excluir <strong>${cidade.nomeCidade}</strong>?`,
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
        html: 'Por favor, aguarde enquanto a cidade é removida.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      this.http.delete(`${environment.apiBaseUrl}/cidades/${cidade.idCidade}`).subscribe({
        next: () => {
          this.carregarCidades();
          Swal.fire({
            title: 'Excluída!',
            text: `A cidade ${cidade.nomeCidade} foi removida com sucesso.`,
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
    const totalPaginas = Math.max(1, Math.ceil(this.cidades.length / this.itensPorPagina));
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);

    // ajustar paginaAtual se por acaso for maior que totalPaginas - 1
    if (this.paginaAtual >= totalPaginas) {
      this.paginaAtual = totalPaginas - 1;
    }

    const inicio = this.paginaAtual * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.cidadesPaginadas = this.cidades.slice(inicio, fim);
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
    if (this.cidades.length === 0) return 0;
    return this.paginaAtual * this.itensPorPagina + 1;
  }

  get exibicaoFim(): number {
    if (this.cidades.length === 0) return 0;
    return Math.min((this.paginaAtual + 1) * this.itensPorPagina, this.cidades.length);
  }

  get totalItens(): number {
    return this.cidades.length;
  }
}
