import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

interface Funcionario {
  idFuncionario: number;
  nomeFuncionario: string;
  emailFuncionario: string;
  ativo: boolean;
  idFuncao: number;
  nomeFuncao: string;
  idGrupoUsuario: number | null;
  nomeGrupoUsuario: string | null;
}

@Component({
  selector: 'app-funcionarios-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funcionarios-list.component.html',
  styleUrls: ['./funcionarios-list.component.css']
})
export class FuncionariosListComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  funcionariosPaginados: Funcionario[] = [];
  resumoFuncoes: { nomeFuncao: string, total: number }[] = [];
  funcoesComQuantidade: { nomeFuncao: string; quantidade: number }[] = [];
  

  Math = Math;

  paginaAtual = 0;
  itensPorPagina = 5;
  paginas: number[] = [];

  funcionariosAtivos = 0;
  funcionariosInativos = 0;
  totalCargos = 0;

  carregando = false;
  erro: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarFuncionarios();
  }

  carregarFuncionarios(): void {
    this.carregando = true;
    this.http.get<Funcionario[]>(`${environment.apiBaseUrl}/funcionarios`).subscribe({
      next: (data) => {
        this.funcionarios = data;
        
      // Calcula os quantitativos
      this.funcionariosAtivos = data.filter(f => f.ativo).length;
      this.funcionariosInativos = data.filter(f => !f.ativo).length;

      // Conta cargos únicos
      const cargos = new Set(data.map(f => f.nomeFuncao));
      this.totalCargos = cargos.size;
        this.atualizarResumo();
        this.atualizarPaginacao();
        
        this.gerarQuantitativoPorFuncao();

        this.carregando = false;
      },
      error: (err) => {
        console.error('Erro ao carregar funcionários:', err);
        this.erro = 'Erro ao carregar funcionários.';
        this.carregando = false;
      }
    });
  }

        gerarQuantitativoPorFuncao(): void {
        const mapa = new Map<string, number>();

        this.funcionarios.forEach((f) => {
          const funcao = f.nomeFuncao || 'Sem Função';
          mapa.set(funcao, (mapa.get(funcao) || 0) + 1);
        });

        this.funcoesComQuantidade = Array.from(mapa, ([nomeFuncao, quantidade]) => ({
          nomeFuncao,
          quantidade,
        }));
      }
    

  atualizarResumo(): void {
    const mapa = new Map<string, number>();
    for (const f of this.funcionarios) {
      mapa.set(f.nomeFuncao, (mapa.get(f.nomeFuncao) || 0) + 1);
    }
    this.resumoFuncoes = Array.from(mapa, ([nomeFuncao, total]) => ({ nomeFuncao, total }));
  }

  atualizarPaginacao(): void {
    const totalPaginas = Math.ceil(this.funcionarios.length / this.itensPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
    this.funcionariosPaginados = this.funcionarios.slice(
      this.paginaAtual * this.itensPorPagina,
      (this.paginaAtual + 1) * this.itensPorPagina
    );
  }

  mudarPagina(p: number): void {
    if (p < 0 || p >= this.paginas.length) return;
    this.paginaAtual = p;
    this.atualizarPaginacao();
  }

  novoFuncionario() {
    this.router.navigate(['/home/_adm/funcionariosForm']);
  }

editar(func: Funcionario) {
  this.router.navigate([`/home/_adm/funcionariosForm/${func.idFuncionario}`]);

}
  

  excluir(func: Funcionario) {
    Swal.fire({
      title: 'Excluir funcionário?',
      html: `Tem certeza que deseja excluir <strong>${func.nomeFuncionario}</strong>?`,
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
          html: 'Por favor, aguarde enquanto o funcionário é removido.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });

        this.http.delete(`${environment.apiBaseUrl}/funcionarios/${func.idFuncionario}`).subscribe({
          next: () => {
            this.carregarFuncionarios();
            Swal.fire({
              title: 'Excluído!',
              text: `O funcionário ${func.nomeFuncionario} foi removido com sucesso.`,
              icon: 'success',
              confirmButtonColor: '#198754',
              timer: 1800,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Erro ao excluir funcionário:', err);
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível excluir o funcionário.',
              icon: 'error',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }
    });
  }
}
