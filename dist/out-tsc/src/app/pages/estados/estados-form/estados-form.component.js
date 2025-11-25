import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let EstadosFormComponent = class EstadosFormComponent {
    constructor(estadoService, route, router) {
        this.estadoService = estadoService;
        this.route = route;
        this.router = router;
        this.estado = { idEstado: 0, siglaEstado: '', nomeEstado: '' };
    }
    ngOnInit() {
        this.id = Number(this.route.snapshot.paramMap.get('id'));
        if (this.id) {
            this.estadoService.buscarPorId(this.id).subscribe(data => this.estado = data);
        }
    }
    salvar() {
        if (this.id) {
            this.estadoService.atualizar(this.id, this.estado).subscribe(() => {
                Swal.fire('Sucesso', 'Estado atualizado com sucesso!', 'success');
                this.router.navigate(['/home/_cad/estadosListar']);
            });
        }
        else {
            this.estadoService.salvar(this.estado).subscribe(() => {
                Swal.fire('Sucesso', 'Estado cadastrado com sucesso!', 'success');
                this.router.navigate(['/home/_cad/estadosListar']);
            });
        }
    }
    cancelar() {
        this.router.navigate(['/home/_cad/estadosListar']);
    }
};
EstadosFormComponent = __decorate([
    Component({
        selector: 'app-estados-form',
        templateUrl: './estados-form.component.html',
        styleUrls: ['./estados-form.component.css']
    })
], EstadosFormComponent);
export { EstadosFormComponent };
//# sourceMappingURL=estados-form.component.js.map