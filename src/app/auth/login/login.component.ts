import { Component } from '@angular/core';
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

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  submit() {
    this.error = '';
    if (this.form.invalid) { this.error = 'Preencha e-mail e senha'; return; }
    const { email, senha } = this.form.value;
    this.auth.login(email, senha).subscribe({
      next: () => this.router.navigate(['/home']),
      error: (err) => this.error = err?.error?.mensagem || 'Erro no login'
    });
  }
}