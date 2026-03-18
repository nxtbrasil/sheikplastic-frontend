import { Component, HostListener } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required]]
  });

  error = '';
  loading = false;
  deferredPrompt: any; // Captura o evento de instalação

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onBeforeInstallPrompt(e: any) {
    console.log('Evento de instalação capturado!', e); // Adicione este log
    e.preventDefault();
    this.deferredPrompt = e;
  }

  instalarApp() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          this.deferredPrompt = null;
        }
      });
    }
  }

  submit() {
    this.error = '';
    if (this.form.invalid) {
      this.error = 'Preencha e-mail e senha corretamente.';
      return;
    }
    this.loading = true;
    const { email, senha } = this.form.value;
    this.auth.login(email!, senha!).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Credenciais inválidas.';
      }
    });
  }

  recuperarSenha() {
    alert('Função de recuperação de senha em desenvolvimento.');
  }
}