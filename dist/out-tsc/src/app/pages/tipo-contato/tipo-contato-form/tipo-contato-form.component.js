import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let TipoContatoFormComponent = class TipoContatoFormComponent {
    constructor(route, router, service) {
        this.route = route;
        this.router = router;
        this.service = service;
        this.tipo = { descricao: '' };
    }
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) {
            this.service.buscarPorId(this.id).subscribe(dados => {
                this.tipo = dados;
            });
        }
    }
    salvar() {
        if (this.id) {
            this.service.atualizar(this.tipo).subscribe(() => {
                Swal.fire('Sucesso', 'Tipo Contato atualizado com sucesso!', 'success');
                this.router.navigate(['/home/_cad/tiposContatoListar']);
            });
        }
        else {
            this.service.salvar(this.tipo).subscribe(() => {
                Swal.fire('Sucesso', 'Tipo Contato cadastrado com sucesso!', 'success');
                this.router.navigate(['/home/_cad/tiposContatoListar']);
            });
        }
    }
    cancelar() {
        this.router.navigate(['/home/_cad/tiposContatoListar']);
    }
};
TipoContatoFormComponent = __decorate([
    Component({
        selector: 'app-tipo-contato-form',
        templateUrl: './tipo-contato-form.component.html',
        styleUrls: ['./tipo-contato-form.component.css']
    })
], TipoContatoFormComponent);
export { TipoContatoFormComponent };
//# sourceMappingURL=tipo-contato-form.component.js.map