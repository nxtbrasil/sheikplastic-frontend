import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
let FuncionarioFormComponent = class FuncionarioFormComponent {
    constructor(fb, http, route, router) {
        this.fb = fb;
        this.http = http;
        this.route = route;
        this.router = router;
        this.funcoes = [];
        this.isEdicao = false;
    }
    ngOnInit() {
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
        this.http.get(`${environment.apiBaseUrl}/funcoes`).subscribe({
            next: (res) => (this.funcoes = res),
            error: (err) => console.error('Erro ao carregar funções', err),
        });
    }
    carregarFuncionario(id) {
        this.http.get(`${environment.apiBaseUrl}/funcionarios/${id}`).subscribe({
            next: (data) => {
                this.formFuncionario.patchValue(data);
            },
            error: (err) => console.error('Erro ao carregar funcionário', err),
        });
    }
    onSubmit() {
        if (this.formFuncionario.invalid)
            return;
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
                this.router.navigate(['home/_adm/funcionariosListar']);
            },
            error: (err) => {
                console.error('Erro ao salvar', err);
                Swal.fire('Erro', 'Não foi possível salvar o funcionário.', 'error');
            },
        });
    }
    cancelar() {
        this.router.navigate(['home/_adm/funcionariosListar']);
    }
};
FuncionarioFormComponent = __decorate([
    Component({
        selector: 'app-funcionarios-form',
        standalone: true,
        imports: [CommonModule, ReactiveFormsModule],
        templateUrl: './funcionarios-form.component.html',
        styleUrls: ['./funcionarios-form.component.css']
    })
], FuncionarioFormComponent);
export { FuncionarioFormComponent };
//# sourceMappingURL=funcionarios-form.component.js.map