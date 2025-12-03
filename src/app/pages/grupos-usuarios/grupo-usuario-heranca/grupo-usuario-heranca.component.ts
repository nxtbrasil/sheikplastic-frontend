import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrupoUsuarioHerancaService } from './grupo-usuario-heranca.service';
import { GrupoFilhoDTO } from './grupo-usuario-heranca.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupo-usuario-heranca',
  templateUrl: './grupo-usuario-heranca.component.html',
  styleUrls: ['./grupo-usuario-heranca.component.css'],
})
export class GrupoUsuarioHerancaComponent implements OnInit {
  idGrupoPai!: number;
  herancas: GrupoFilhoDTO[] = [];
  grupoPaiNome = '';

  constructor(
    private service: GrupoUsuarioHerancaService,
    private route: ActivatedRoute,
      private router: Router
  ) {}


  ngOnInit(): void {
    this.idGrupoPai = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarHerancas();
  }

  carregarHerancas(): void {
    this.service.listar(this.idGrupoPai).subscribe({
      next: (data) => {
        this.herancas = data.grupos;
        this.grupoPaiNome = data.grupoPai.nome;
      },
      error: (err) => console.error('Erro ao listar heranças:', err),
    });
  }

  /** 🔹 Ação direta ao marcar/desmarcar o checkbox */
  onCheckboxChange(event: Event, grupo: GrupoFilhoDTO): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      // 👉 Vincular automaticamente
      this.service.vincular(this.idGrupoPai, grupo.idGrupoUsuario).subscribe({
        next: () => {
          grupo.vinculado = true;
          this.alertaSucesso(`Grupo "${grupo.nomeGrupoUsuario}" vinculado com sucesso!`);
        },
        error: (err) => {
          console.error('Erro ao vincular:', err);
          (event.target as HTMLInputElement).checked = false; // desfaz a marcação
          this.alertaErro('Erro ao vincular grupo.');
        },
      });
    } else {
      // 👉 Desvincular automaticamente
      this.service.desvincular(this.idGrupoPai, grupo.idGrupoUsuario).subscribe({
        next: () => {
          grupo.vinculado = false;
          this.alertaSucesso(`Grupo "${grupo.nomeGrupoUsuario}" desvinculado com sucesso!`);
        },
        error: (err) => {
          console.error('Erro ao desvincular:', err);
          (event.target as HTMLInputElement).checked = true; // desfaz a desmarcação
          this.alertaErro('Erro ao desvincular grupo.');
        },
      });
    }
  }

  alertaSucesso(msg: string): void {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: msg,
      showConfirmButton: false,
      timer: 1600,
    });
  }

  alertaErro(msg: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: msg,
      showConfirmButton: true,
    });
  }

      voltar() {
    this.router.navigate(['home/gruposusuario']);
  }
}
