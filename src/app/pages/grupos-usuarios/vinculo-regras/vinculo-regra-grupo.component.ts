import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';

interface Regra {
  idRegra: number;
  chaveRegra: string;
  descricaoRegra: string;
  vinculada?: boolean;
}

interface Modulo {
  nome: string;
  regras: Regra[];
}

@Component({
  selector: 'app-vinculo-regra-grupo',
  templateUrl: './vinculo-regra-grupo.component.html',
  styleUrls: ['./vinculo-regra-grupo.component.css'],
})
export class VinculoRegraGrupoComponent implements OnInit {
  grupoId!: number;
  modulos: Modulo[] = [];
  modulosFiltrados: Modulo[] = [];
  busca: string = '';
  carregando = false;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.grupoId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarRegras();
  }

  carregarRegras(): void {
    this.carregando = true;

    const todasRegras$ = this.http.get<Regra[]>(`${environment.apiBaseUrl}/grupos-usuario/regras`);
    const regrasVinculadas$ = this.http.get<Regra[]>(`${environment.apiBaseUrl}/grupos-usuario/${this.grupoId}/regras`);

    Promise.all([todasRegras$.toPromise(), regrasVinculadas$.toPromise()])
      .then(([todas, vinculadas]) => {
        const vinculadasIds = vinculadas.map((r) => r.idRegra);
        todas.forEach((r) => (r.vinculada = vinculadasIds.includes(r.idRegra)));

        this.modulos = this.agruparPorModulo(todas);
        this.modulosFiltrados = [...this.modulos];
      })
      .catch(() => Swal.fire('Erro', 'Falha ao carregar regras.', 'error'))
      .finally(() => (this.carregando = false));
  }

  agruparPorModulo(regras: Regra[]): Modulo[] {
    const grupos: { [key: string]: Regra[] } = {};

    regras.forEach((r) => {
      const match = r.descricaoRegra.match(/\[(.*?)\]/);
      const modulo = match ? match[1] : 'Outros';
      if (!grupos[modulo]) grupos[modulo] = [];
      grupos[modulo].push(r);
    });

    return Object.keys(grupos)
      .sort()
      .map((modulo) => ({ nome: modulo, regras: grupos[modulo] }));
  }

  filtrar(): void {
    const termo = this.busca.toLowerCase();
    this.modulosFiltrados = this.modulos
      .map((m) => ({
        ...m,
        regras: m.regras.filter((r) =>
          r.descricaoRegra.toLowerCase().includes(termo)
        ),
      }))
      .filter((m) => m.regras.length > 0);
  }
    voltar() {
    this.router.navigate(['/home/_adm/gruposUsuarioListar']);
  }


   alternarVinculo(regra: Regra): void {
    const url = `${environment.apiBaseUrl}/grupos-usuario/${this.grupoId}/regras/${regra.idRegra}`;
    
    // Define o tipo de resposta como texto
    const acao = regra.vinculada
      ? this.http.delete(url, { responseType: 'text' })
      : this.http.post(url, {}, { responseType: 'text' });

    regra.vinculada = !regra.vinculada;

    acao.subscribe({
      next: (resposta) => {
        // Mostra a resposta real do backend
        Swal.fire({
          title: resposta,
          icon: regra.vinculada ? 'success' : 'info',
          timer: 1500,
          showConfirmButton: false,
        });
      },
      error: (err) => {
        // Reverte o estado visual se falhar
        regra.vinculada = !regra.vinculada;
        Swal.fire('Erro', 'Não foi possível atualizar o vínculo.', 'error');
        console.error('Erro ao atualizar vínculo:', err);
      },
    });
  }
}
