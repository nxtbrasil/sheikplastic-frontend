import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let TrocaSenhaComponent = class TrocaSenhaComponent {
    constructor(fb, authService, router) {
        this.fb = fb;
        this.authService = authService;
        this.router = router;
        this.mensagem = '';
        this.sucesso = false;
        this.carregando = false;
    }
    ngOnInit() {
        this.formTrocaSenha = this.fb.group({
            senhaAtual: ['', [Validators.required, Validators.minLength(4)]],
            novaSenha: ['', [Validators.required, Validators.minLength(4)]],
            confirmacao: ['', [Validators.required]]
        }, { validators: this.validarSenhasIguais });
    }
    /** ✅ Corrigida: agora retorna null corretamente */
    validarSenhasIguais(form) {
        const nova = form.get('novaSenha')?.value;
        const conf = form.get('confirmacao')?.value;
        // só valida se ambos os campos estiverem preenchidos
        if (!nova || !conf)
            return null;
        return nova === conf ? null : { senhasDiferentes: true };
    }
    /** 🚀 Submissão */
    onSubmit() {
        if (this.formTrocaSenha.invalid) {
            this.mensagem = 'Preencha todos os campos corretamente.';
            this.sucesso = false;
            return;
        }
        this.carregando = true;
        const { senhaAtual, novaSenha } = this.formTrocaSenha.value;
        this.authService.trocarSenha(senhaAtual, novaSenha).subscribe({
            next: () => {
                this.mensagem = 'Senha alterada com sucesso!';
                this.sucesso = true;
                this.carregando = false;
                setTimeout(() => this.router.navigate(['/home']), 1500);
            },
            error: (erro) => {
                this.mensagem = erro.error?.message || 'Erro ao alterar senha.';
                this.sucesso = false;
                this.carregando = false;
            }
        });
    }
    onCancelar() {
        this.router.navigate(['/home']);
    }
};
TrocaSenhaComponent = __decorate([
    Component({
        selector: 'app-troca-senha',
        templateUrl: './troca-senha.component.html',
        styleUrls: ['./troca-senha.component.css']
    })
], TrocaSenhaComponent);
export { TrocaSenhaComponent };
//# sourceMappingURL=troca-senha.component.js.map