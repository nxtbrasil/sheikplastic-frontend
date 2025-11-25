import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
let GruposUsuariosEditarComponent = class GruposUsuariosEditarComponent {
    constructor(fb, route, router, http) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.http = http;
        this.idGrupo = null;
        this.titulo = 'Novo Grupo';
    }
    ngOnInit() {
        // Inicializa o formulário
        this.form = this.fb.group({
            nomeGrupoUsuario: ['', Validators.required],
        });
        // Captura o ID da rota, se houver
        const idParam = this.route.snapshot.paramMap.get('id');
        if (idParam) {
            this.idGrupo = Number(idParam);
            this.titulo = 'Editar Grupo';
            this.carregarGrupo();
        }
    }
    carregarGrupo() {
        this.http.get(`${environment.apiBaseUrl}/grupos-usuario/${this.idGrupo}`).subscribe({
            next: data => {
                // garante que só os campos existentes sejam mapeados
                this.form.patchValue({
                    nomeGrupoUsuario: data.nomeGrupoUsuario,
                });
            },
            error: () => Swal.fire('Erro', 'Não foi possível carregar as informações do grupo.', 'error')
        });
    }
    salvar() {
        if (this.form.invalid) {
            Swal.fire('Atenção', 'Preencha os campos obrigatórios.', 'warning');
            return;
        }
        const grupo = this.form.value;
        const request = this.idGrupo
            ? this.http.put(`${environment.apiBaseUrl}/grupos-usuario/${this.idGrupo}`, grupo)
            : this.http.post(`${environment.apiBaseUrl}/grupos-usuario`, grupo);
        request.subscribe({
            next: () => {
                Swal.fire('Sucesso', 'Grupo salvo com sucesso!', 'success').then(() => this.router.navigate(['/home/_adm/gruposUsuarioListar']));
            },
            error: () => Swal.fire('Erro', 'Não foi possível salvar o grupo.', 'error')
        });
    }
    cancelar() {
        this.router.navigate(['/home/_adm/gruposUsuarioListar']);
    }
};
GruposUsuariosEditarComponent = __decorate([
    Component({
        selector: 'app-grupos-usuarios-editar',
        standalone: true,
        imports: [CommonModule, ReactiveFormsModule],
        templateUrl: './grupos-usuarios-editar.component.html',
        styleUrls: ['./grupos-usuarios-editar.component.css']
    })
], GruposUsuariosEditarComponent);
export { GruposUsuariosEditarComponent };
//# sourceMappingURL=grupos-usuarios-editar.component.js.map