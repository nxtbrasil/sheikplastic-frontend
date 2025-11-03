import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface GrupoUsuario {
  idGrupoUsuario: number;
  nomeGrupoUsuario: string;
  descricao?: string;
}

@Component({
  selector: 'app-lista-grupo-usuario',
    standalone: true,
    imports: [CommonModule],
  templateUrl: './grupos-usuarios-listar.component.html',
  styleUrls: ['./grupos-usuarios-listar.component.css']
})
export class ListaGrupoUsuarioComponent implements OnInit {

  grupos: GrupoUsuario[] = [];
  gruposPaginados: GrupoUsuario[] = [];
  paginaAtual = 0;
  itensPorPagina = 10;
  paginas: number[] = [];

  // 👉 Correção aqui:
  Math = Math;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.carregarGrupos();
  }

  carregarGrupos(): void {
    this.http.get<GrupoUsuario[]>(`${environment.apiBaseUrl}/grupos-usuario`).subscribe({
      next: (res) => {
        this.grupos = res;
        this.atualizarPaginacao();
      },
      error: () => {
        Swal.fire('Erro', 'Não foi possível carregar os grupos de usuário.', 'error');
      }
    });
  }

  atualizarPaginacao(): void {
    const inicio = this.paginaAtual * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.gruposPaginados = this.grupos.slice(inicio, fim);
    this.paginas = Array(Math.ceil(this.grupos.length / this.itensPorPagina))
      .fill(0)
      .map((_, i) => i);
  }

  mudarPagina(p: number): void {
    if (p < 0 || p >= this.paginas.length) return;
    this.paginaAtual = p;
    this.atualizarPaginacao();
  }

 // ✅ Corrigido: redireciona corretamente
  novoGrupoUsuario(): void {
    this.router.navigate(['/home/_adm/gruposUsuarioForm']);
  } 

  // ✅ Corrigido: rota para edição com ID
  editar(g: GrupoUsuario): void {
    this.router.navigate([`/home/_adm/gruposUsuarioForm/`, g.idGrupoUsuario]);
  }

vinculo(g: GrupoUsuario): void {
  this.router.navigate([`/home/_adm/vinculoFuncionario`, g.idGrupoUsuario]);
}
  excluir(g: GrupoUsuario): void {
    Swal.fire({
      title: 'Excluir grupo?',
      text: `Tem certeza que deseja excluir o grupo "${g.nomeGrupoUsuario}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`${environment.apiBaseUrl}/grupos-usuario/${g.idGrupoUsuario}`).subscribe({
          next: () => {
            this.grupos = this.grupos.filter(x => x.idGrupoUsuario !== g.idGrupoUsuario);
            this.atualizarPaginacao();
            Swal.fire('Excluído!', 'Grupo removido com sucesso.', 'success');
          },
          error: () => {
            Swal.fire('Erro', 'Não foi possível excluir o grupo.', 'error');
          }
        });
      }
    });
  }
// 🔒 Ações extras (placeholders)
configurarPermissoes(g: GrupoUsuario): void {
  this.router.navigate([`/home/_adm/vinculoRegras/${g.idGrupoUsuario}`]);
}

  gerenciarUsuarios(g: GrupoUsuario): void {
    this.router.navigate([`/home/_adm/vinculoHeranca/${g.idGrupoUsuario}`]);
  }
}
