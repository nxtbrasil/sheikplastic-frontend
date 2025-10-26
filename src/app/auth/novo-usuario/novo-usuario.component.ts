import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent {
  usuarioForm!: FormGroup;
  loading = false;
  sucesso = false;
  erro = '';

  constructor(
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nomeFuncionario: ['', Validators.required],
      idFuncao: ['', Validators.required],
      emailFuncionario: ['', [Validators.required, Validators.email]],
      senhaFuncionarioTexto: ['', [Validators.required, Validators.minLength(4)]],
      ativo: [true]
    });
  }

  salvarUsuario(): void {
    if (this.usuarioForm.invalid) return;

    this.loading = true;

    const formValue = this.usuarioForm.value;

    // Monta o payload com idFuncao também em idGrupoUsuario
    const novoUsuario = {
      nomeFuncionario: formValue.nomeFuncionario,
      idFuncao: formValue.idFuncao,
      idGrupoUsuario: formValue.idFuncao, // mesmo valor de idFuncao
      emailFuncionario: formValue.emailFuncionario,
      senhaFuncionarioTexto: formValue.senhaFuncionarioTexto,
      senhaFuncionario: formValue.senhaFuncionarioTexto,
      ativo: formValue.ativo
    };

    this.usuarioService.criarUsuario(novoUsuario).subscribe({
      next: () => {
        this.sucesso = true;
        this.loading = false;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error(err);
        this.erro = 'Erro ao criar usuário';
        this.loading = false;
      }
    });
  }
}
