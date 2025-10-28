import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html',
  styleUrls: ['./meu-perfil.component.css']
})
export class MeuPerfilComponent implements OnInit {
  formPerfil!: FormGroup;
  carregando = false;
  mensagem = '';
  sucesso = false;

  funcionario: any;
  funcoes: any[] = []; // Lista de funções para o combo

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formPerfil = this.fb.group({
      idFuncionario: [{ value: '', disabled: true }],
      nomeFuncionario: ['', [Validators.required, Validators.minLength(3)]],
      emailFuncionario: ['', [Validators.required, Validators.email]],
      idFuncao: ['', Validators.required],
      ativo: [{ value: '', disabled: true }]
    });

    this.carregarFuncoes(); // Primeiro carrega as funções
  }

  carregarFuncoes() {
    this.http.get(`${environment.apiBaseUrl}/funcoes`).subscribe({
      next: (res: any) => {
        this.funcoes = res;
        this.carregarDadosFuncionario(); // Depois carrega o funcionário (para selecionar a função certa)
      },
      error: (err) => {
        console.error(err);
        this.mensagem = 'Erro ao carregar lista de funções.';
      }
    });
  }

  carregarDadosFuncionario() {
    const idFuncionario = localStorage.getItem('idFuncionario');

    if (!idFuncionario) {
      this.mensagem = 'Usuário não encontrado.';
      return;
    }

    this.http.get(`${environment.apiBaseUrl}/funcionarios/${idFuncionario}`).subscribe({
      next: (res: any) => {
        this.funcionario = res;
        this.formPerfil.patchValue({
          idFuncionario: res.idFuncionario,
          nomeFuncionario: res.nomeFuncionario,
          emailFuncionario: res.emailFuncionario,
          idFuncao: res.idFuncao, // Define o valor do select
          ativo: res.ativo ? 'Ativo' : 'Inativo'
        });
      },
      error: (err) => {
        console.error(err);
        this.mensagem = 'Erro ao carregar dados do perfil.';
      }
    });
  }

  salvarAlteracoes() {
    if (this.formPerfil.invalid) {
      this.mensagem = 'Preencha todos os campos corretamente.';
      this.sucesso = false;
      return;
    }

    this.carregando = true;

    const payload = {
      idFuncionario: this.funcionario.idFuncionario,
      nomeFuncionario: this.formPerfil.get('nomeFuncionario')?.value,
      emailFuncionario: this.formPerfil.get('emailFuncionario')?.value,
      idFuncao: this.formPerfil.get('idFuncao')?.value, // valor do combo
      ativo: this.funcionario.ativo,
      idGrupoUsuario: this.formPerfil.get('idFuncao')?.value
    };

    this.http.put(`${environment.apiBaseUrl}/funcionarios/${payload.idFuncionario}`, payload)
      .subscribe({
        next: () => {
          this.sucesso = true;
          this.mensagem = 'Perfil atualizado com sucesso!';
          this.carregando = false;
        },
        error: (err) => {
          this.sucesso = false;
          this.mensagem = err.error?.message || 'Erro ao atualizar perfil.';
          this.carregando = false;
        }
      });
  }

  cancelar() {
    this.router.navigate(['/home']);
  }
}
