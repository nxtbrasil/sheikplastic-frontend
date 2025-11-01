import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-grupos-usuarios-editar',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './grupos-usuarios-editar.component.html',
  styleUrls: ['./grupos-usuarios-editar.component.css']
})
export class GruposUsuariosEditarComponent implements OnInit {
  form!: FormGroup;
  idGrupo: number | null = null;
  titulo = 'Novo Grupo';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.form = this.fb.group({
      nomeGrupoUsuario: ['', Validators.required],
    });

    // Captura o ID da rota, se houver
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.idGrupo = Number(idParam);
      this.titulo = 'Editar Grupo';
      this.carregarGrupo();
    }
  }

  carregarGrupo(): void {
    this.http.get<any>(`${environment.apiBaseUrl}/grupos-usuario/${this.idGrupo}`).subscribe({
      next: data => {
        // garante que só os campos existentes sejam mapeados
        this.form.patchValue({
          nomeGrupoUsuario: data.nomeGrupoUsuario,
        });
      },
      error: () =>
        Swal.fire('Erro', 'Não foi possível carregar as informações do grupo.', 'error')
    });
  }

  salvar(): void {
    if (this.form.invalid) {
      Swal.fire('Atenção', 'Preencha os campos obrigatórios.', 'warning');
      return;
    }

    const grupo = this.form.value;

    const request = this.idGrupo
      ? this.http.put(`${environment.apiBaseUrl}/grupos-usuario/${this.idGrupo}`, grupo)
      : this.http.post(`${environment.apiBaseUrl}/grupos-usuario`, grupo);

    request.subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Grupo salvo com sucesso!', 'success').then(() =>
          this.router.navigate(['/home/_adm/gruposUsuarioListar'])
        );
      },
      error: () => Swal.fire('Erro', 'Não foi possível salvar o grupo.', 'error')
    });
  }

  cancelar(): void {
    this.router.navigate(['/home/_adm/gruposUsuarioListar']);
  }
}
