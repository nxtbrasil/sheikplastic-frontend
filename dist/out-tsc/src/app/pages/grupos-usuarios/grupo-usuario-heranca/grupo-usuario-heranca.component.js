import { __decorate } from "tslib";
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
let GrupoUsuarioHerancaComponent = class GrupoUsuarioHerancaComponent {
    constructor(service, route, router) {
        this.service = service;
        this.route = route;
        this.router = router;
        this.herancas = [];
        this.grupoPaiNome = '';
    }
    ngOnInit() {
        this.idGrupoPai = Number(this.route.snapshot.paramMap.get('id'));
        this.carregarHerancas();
    }
    carregarHerancas() {
        this.service.listar(this.idGrupoPai).subscribe({
            next: (data) => {
                this.herancas = data.grupos;
                this.grupoPaiNome = data.grupoPai.nome;
            },
            error: (err) => console.error('Erro ao listar heranças:', err),
        });
    }
    /** 🔹 Ação direta ao marcar/desmarcar o checkbox */
    onCheckboxChange(event, grupo) {
        const checked = event.target.checked;
        if (checked) {
            // 👉 Vincular automaticamente
            this.service.vincular(this.idGrupoPai, grupo.idGrupoUsuario).subscribe({
                next: () => {
                    grupo.vinculado = true;
                    this.alertaSucesso(`Grupo "${grupo.nomeGrupoUsuario}" vinculado com sucesso!`);
                },
                error: (err) => {
                    console.error('Erro ao vincular:', err);
                    event.target.checked = false; // desfaz a marcação
                    this.alertaErro('Erro ao vincular grupo.');
                },
            });
        }
        else {
            // 👉 Desvincular automaticamente
            this.service.desvincular(this.idGrupoPai, grupo.idGrupoUsuario).subscribe({
                next: () => {
                    grupo.vinculado = false;
                    this.alertaSucesso(`Grupo "${grupo.nomeGrupoUsuario}" desvinculado com sucesso!`);
                },
                error: (err) => {
                    console.error('Erro ao desvincular:', err);
                    event.target.checked = true; // desfaz a desmarcação
                    this.alertaErro('Erro ao desvincular grupo.');
                },
            });
        }
    }
    alertaSucesso(msg) {
        Swal.fire({
            icon: 'success',
            title: 'Sucesso!',
            text: msg,
            showConfirmButton: false,
            timer: 1600,
        });
    }
    alertaErro(msg) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: msg,
            showConfirmButton: true,
        });
    }
    voltar() {
        this.router.navigate(['/home/_adm/gruposUsuarioListar']);
    }
};
GrupoUsuarioHerancaComponent = __decorate([
    Component({
        selector: 'app-grupo-usuario-heranca',
        templateUrl: './grupo-usuario-heranca.component.html',
        styleUrls: ['./grupo-usuario-heranca.component.css'],
    })
], GrupoUsuarioHerancaComponent);
export { GrupoUsuarioHerancaComponent };
//# sourceMappingURL=grupo-usuario-heranca.component.js.map