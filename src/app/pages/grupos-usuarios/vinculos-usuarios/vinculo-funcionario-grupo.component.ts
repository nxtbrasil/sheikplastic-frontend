import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vinculo-funcionario-grupo',
  templateUrl: './vinculo-funcionario-grupo.component.html',
  styleUrls: ['./vinculo-funcionario-grupo.component.css'],
})
export class VinculoFuncionarioGrupoComponent implements OnInit {
  grupos: any[] = [];
  funcionarios: any[] = [];
  grupoSelecionado: number | null = null;
  grupoAtual: any = null;
  filtro: string = '';
  carregando = false;

  private apiUrl = `${environment.apiBaseUrl}`;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log('Parâmetros da rota:', params);
      const idGrupo = params.get('id');

      if (idGrupo) {
        this.grupoSelecionado = Number(idGrupo);
        this.carregarGrupoSelecionado(this.grupoSelecionado);
      } else {
        this.carregarGrupos();
      }

      this.carregarFuncionarios();
    });
  }

  voltar() {
    this.router.navigate(['/home/_adm/gruposUsuarioListar']);
  }

  // 🔹 Busca o grupo específico da URL
  carregarGrupoSelecionado(idGrupo: number) {
    this.http.get<any>(`${this.apiUrl}/grupos-usuario/${idGrupo}`).subscribe({
      next: (grupo) => {
        this.grupoAtual = grupo;
        this.grupos = [grupo]; // preenche o select com apenas esse grupo
        this.carregarFuncionariosVinculados();
      },
      error: (err) => console.error('Erro ao carregar grupo selecionado', err),
    });
  }

  carregarGrupos() {
    this.http.get<any[]>(`${this.apiUrl}/grupos-usuario`).subscribe({
      next: (data) => (this.grupos = data),
      error: (err) => console.error('Erro ao carregar grupos', err),
    });
  }

  alternarVinculo(func: any) {
    if (!this.grupoSelecionado) {
      Swal.fire('Atenção', 'Selecione um grupo antes de vincular.', 'warning');
      return;
    }

    if (func.idGrupoUsuario) {
      this.desvincularFuncionario(func.idFuncionario);
    } else {
      this.vincularFuncionario(func.idFuncionario);
    }
  }

  carregarFuncionarios() {
    this.http.get<any[]>(`${this.apiUrl}/funcionarios`).subscribe({
      next: (data) => {
        this.funcionarios = data.map((f) => ({
          ...f,
          vinculado: false,
        }));
        if (this.grupoSelecionado) this.carregarFuncionariosVinculados();
      },
      error: (err) => console.error('Erro ao carregar funcionários', err),
    });
  }

  carregarFuncionariosVinculados() {
    if (!this.grupoSelecionado) return;
    this.http
      .get<any[]>(`${this.apiUrl}/grupo-usuario-funcionario/${this.grupoSelecionado}`)
      .subscribe({
        next: (vinculos) => {
          this.funcionarios.forEach((f) => {
            f.vinculado = vinculos.some(
              (v) => v.idFuncionario === f.idFuncionario
            );
          });
        },
        error: (err) => console.error('Erro ao carregar vínculos', err),
      });
  }

  funcionariosFiltrados() {
    const termo = this.filtro.toLowerCase();
    return this.funcionarios.filter(
      (f) =>
        f.nomeFuncionario.toLowerCase().includes(termo) ||
        f.emailFuncionario.toLowerCase().includes(termo)
    );
  }

  vincularFuncionario(funcionarioId: number) {
    if (!this.grupoSelecionado) {
      Swal.fire('Atenção', 'Selecione um grupo antes de vincular.', 'warning');
      return;
    }

    this.carregando = true;

    const url = `${this.apiUrl}/grupo-usuario-funcionario/vincular?idFuncionario=${funcionarioId}&idGrupoUsuario=${this.grupoSelecionado}`;

    this.http.post(url, null).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Funcionário vinculado com sucesso!', 'success');
        this.carregarFuncionarios();
        this.carregando = false;
      },
      error: (err) => {
        console.error(err);
        Swal.fire('Erro', 'Não foi possível vincular o funcionário.', 'error');
        this.carregando = false;
      },
    });
  }

  desvincularFuncionario(funcionarioId: number) {
    if (!this.grupoSelecionado) {
      Swal.fire('Atenção', 'Selecione um grupo antes de desvincular.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: 'O funcionário será desvinculado deste grupo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, desvincular',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.carregando = true;

        const url = `${this.apiUrl}/grupo-usuario-funcionario/desvincular/${funcionarioId}`;

        this.http.request('DELETE', url).subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Funcionário desvinculado!', 'success');
            this.carregarFuncionarios();
            this.carregando = false;
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Erro', 'Não foi possível desvincular o funcionário.', 'error');
            this.carregando = false;
          },
        });
      }
    });
  }
}
