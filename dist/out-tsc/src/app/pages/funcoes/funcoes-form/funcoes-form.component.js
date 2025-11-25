import { __decorate } from "tslib";
import { Component } from '@angular/core';
let FuncoesFormComponent = class FuncoesFormComponent {
    constructor(funcoesService, route, router) {
        this.funcoesService = funcoesService;
        this.route = route;
        this.router = router;
        this.funcao = { nomeFuncao: '' };
        this.editando = false;
    }
    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.editando = true;
            this.funcoesService.buscarPorId(id).subscribe(f => this.funcao = f);
        }
    }
    salvar() {
        if (this.editando && this.funcao.idFuncao) {
            this.funcoesService.atualizar(this.funcao.idFuncao, this.funcao)
                .subscribe(() => this.router.navigate(['home/_cad/funcoesListar']));
        }
        else {
            this.funcoesService.criar(this.funcao)
                .subscribe(() => this.router.navigate(['home/_cad/funcoesListar']));
        }
    }
    cancelar() {
        this.router.navigate(['home/_cad/funcoesListar']);
    }
};
FuncoesFormComponent = __decorate([
    Component({
        selector: 'app-funcoes-form',
        templateUrl: './funcoes-form.component.html',
        styleUrls: ['./funcoes-form.component.css']
    })
], FuncoesFormComponent);
export { FuncoesFormComponent };
//# sourceMappingURL=funcoes-form.component.js.map