import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let LoginComponent = class LoginComponent {
    constructor(fb, auth, router) {
        this.fb = fb;
        this.auth = auth;
        this.router = router;
        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            senha: ['', [Validators.required]]
        });
        this.error = '';
        this.loading = false;
    }
    submit() {
        this.error = '';
        if (this.form.invalid) {
            this.error = 'Preencha e-mail e senha corretamente.';
            return;
        }
        const { email, senha } = this.form.value;
        this.loading = true;
        this.auth.login(email, senha).subscribe({
            next: () => {
                this.loading = false;
                this.router.navigate(['/home']);
            },
            error: (err) => {
                this.loading = false;
                // Tratamento específico de erros
                if (err.status === 403 && err.error?.erro === 'senha') {
                    this.error = 'Senha incorreta. Tente novamente.';
                }
                else if (err.status === 404) {
                    this.error = 'Usuário não encontrado.';
                }
                else if (err.status === 0) {
                    this.error = 'Não foi possível conectar ao servidor. Verifique sua conexão.';
                }
                else {
                    this.error = err.error?.mensagem || 'Erro ao tentar fazer login.';
                }
            }
        });
    }
    recuperarSenha() {
        alert('Função de recuperação de senha em desenvolvimento.');
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.css']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map