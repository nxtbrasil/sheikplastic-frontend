import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionarios-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './funcionarios-form.component.html',
  styleUrls: ['./funcionarios-form.component.css']
})
export class FuncionarioFormComponent implements OnInit {
  formFuncionario!: FormGroup;
  funcoes: any[] = [];
  isEdicao = false;
  idFuncionario!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formFuncionario = this.fb.group({
      nomeFuncionario: ['', Validators.required],
      idFuncao: ['', Validators.required],
      emailFuncionario: ['', [Validators.required, Validators.email]],
      senhaFuncionario: [''],
      senhaFuncionarioTexto: [''],
      ativo: [true],
      idGrupoUsuario: [''],
    });

    this.carregarFuncoes();

    this.idFuncionario = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idFuncionario) {
      this.isEdicao = true;
      this.carregarFuncionario(this.idFuncionario);
    }
  }

  carregarFuncoes() {
    this.http.get<any[]>(`${environment.apiBaseUrl}/funcoes`).subscribe({
      next: (res) => (this.funcoes = res),
      error: (err) => console.error('Erro ao carregar funções', err),
    });
  }

  carregarFuncionario(id: number) {
    this.http.get<any>(`${environment.apiBaseUrl}/funcionarios/${id}`).subscribe({
      next: (data) => {
        this.formFuncionario.patchValue(data);
      },
      error: (err) => console.error('Erro ao carregar funcionário', err),
    });
  }

  onSubmit() {
    if (this.formFuncionario.invalid) return;

    const formValue = this.formFuncionario.value;
    formValue.idGrupoUsuario = formValue.idFuncao;
    formValue.senhaFuncionario = formValue.senhaFuncionarioTexto;

    const url = `${environment.apiBaseUrl}/funcionarios${this.isEdicao ? '/' + this.idFuncionario : ''}`;
    const request = this.isEdicao
      ? this.http.put(url, formValue)
      : this.http.post(url, formValue);

    request.subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: this.isEdicao ? 'Funcionário atualizado!' : 'Funcionário cadastrado!',
          timer: 2000,
          showConfirmButton: false,
        });
        this.router.navigate(['home/funcionarios']);
      },
      error: (err) => {
        console.error('Erro ao salvar', err);
        Swal.fire('Erro', 'Não foi possível salvar o funcionário.', 'error');
      },
    });
  }

  cancelar() {
    this.router.navigate(['home/funcionarios']);
  }
}