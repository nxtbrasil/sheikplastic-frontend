import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.css']
})
export class TrocaSenhaComponent implements OnInit {
  formTrocaSenha!: FormGroup;
  mensagem: string = '';
  sucesso: boolean = false;
  carregando: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formTrocaSenha = this.fb.group({
      senhaAtual: ['', [Validators.required, Validators.minLength(4)]],
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacao: ['', [Validators.required]]
    }, { validators: this.validarSenhasIguais });
  }

  /** 🔒 Validação de confirmação de senha */
  validarSenhasIguais(form: FormGroup) {
    const nova = form.get('novaSenha')?.value;
    const conf = form.get('confirmacao')?.value;
    return nova === conf ? null : { senhasDiferentes: true };
  }

  /** 🚀 Submissão do formulário */
  onSubmit() {
    if (this.formTrocaSenha.invalid) {
      this.mensagem = 'Preencha todos os campos corretamente.';
      this.sucesso = false;
      return;
    }

    this.carregando = true;
    const { senhaAtual, novaSenha } = this.formTrocaSenha.value;

    // this.authService.trocarSenha(senhaAtual, novaSenha).subscribe({
    //   next: () => {
    //     this.mensagem = 'Senha alterada com sucesso!';
    //     this.sucesso = true;
    //     this.carregando = false;

    //     setTimeout(() => this.router.navigate(['/home']), 1500);
    //   },
    //   error: (erro) => {
    //     this.mensagem = erro.error?.message || 'Erro ao alterar senha.';
    //     this.sucesso = false;
    //     this.carregando = false;
    //   }
    // });
  }


  onCancelar() {
    this.router.navigate(['/home']);
  }
}
