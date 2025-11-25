import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let NovoUsuarioComponent = class NovoUsuarioComponent {
    constructor(fb, usuarioService, router) {
        this.fb = fb;
        this.usuarioService = usuarioService;
        this.router = router;
        this.loading = false;
        this.sucesso = false;
        this.erro = '';
    }
    ngOnInit() {
        this.usuarioForm = this.fb.group({
            nomeFuncionario: ['', Validators.required],
            idFuncao: ['', Validators.required],
            emailFuncionario: ['', [Validators.required, Validators.email]],
            senhaFuncionarioTexto: ['', [Validators.required, Validators.minLength(4)]],
            ativo: [true]
        });
    }
    salvarUsuario() {
        if (this.usuarioForm.invalid)
            return;
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
};
NovoUsuarioComponent = __decorate([
    Component({
        selector: 'app-novo-usuario',
        templateUrl: './novo-usuario.component.html',
        styleUrls: ['./novo-usuario.component.css']
    })
], NovoUsuarioComponent);
export { NovoUsuarioComponent };
//# sourceMappingURL=novo-usuario.component.js.map