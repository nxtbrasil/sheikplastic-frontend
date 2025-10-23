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
    }
    submit() {
        this.error = '';
        if (this.form.invalid) {
            this.error = 'Preencha e-mail e senha';
            return;
        }
        const { email, senha } = this.form.value;
        this.auth.login(email, senha).subscribe({
            next: () => this.router.navigate(['/home']),
            error: (err) => this.error = err?.error?.mensagem || 'Erro no login'
        });
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