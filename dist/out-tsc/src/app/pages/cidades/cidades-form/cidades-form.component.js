import { __decorate } from "tslib";
import { Component } from '@angular/core';
let CidadesFormComponent = class CidadesFormComponent {
    constructor(cidadeService, estadoService, route, router) {
        this.cidadeService = cidadeService;
        this.estadoService = estadoService;
        this.route = route;
        this.router = router;
        this.cidade = { nomeCidade: '', estado: { idEstado: 0, nomeEstado: '', siglaEstado: '' } };
        this.estados = [];
        this.editando = false;
    }
    ngOnInit() {
        this.carregarEstados();
        const id = this.route.snapshot.params['id'];
        if (id) {
            this.editando = true;
            this.cidadeService.buscarPorId(id).subscribe(c => this.cidade = c);
        }
    }
    carregarEstados() {
        this.estadoService.listar().subscribe(estados => this.estados = estados);
    }
    compararEstados(e1, e2) {
        return e1 && e2 ? e1.idEstado === e2.idEstado : e1 === e2;
    }
    salvar() {
        if (this.editando && this.cidade.idCidade) {
            this.cidadeService.atualizar(this.cidade.idCidade, this.cidade)
                .subscribe(() => this.router.navigate(['/home/_cad/cidadesListar']));
        }
        else {
            this.cidadeService.criar(this.cidade)
                .subscribe(() => this.router.navigate(['/home/_cad/cidadesListar']));
        }
    }
    cancelar() {
        this.router.navigate(['/home/_cad/cidadesListar']);
    }
};
CidadesFormComponent = __decorate([
    Component({
        selector: 'app-cidades-form',
        templateUrl: './cidades-form.component.html',
        styleUrls: ['./cidades-form.component.css']
    })
], CidadesFormComponent);
export { CidadesFormComponent };
//# sourceMappingURL=cidades-form.component.js.map