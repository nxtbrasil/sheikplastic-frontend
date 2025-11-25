import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
let ListaGrupoUsuarioComponent = class ListaGrupoUsuarioComponent {
    constructor(http, router) {
        this.http = http;
        this.router = router;
        this.grupos = [];
        this.gruposPaginados = [];
        this.paginaAtual = 0;
        this.itensPorPagina = 10;
        this.paginas = [];
        // 👉 Correção aqui:
        this.Math = Math;
    }
    ngOnInit() {
        this.carregarGrupos();
    }
    carregarGrupos() {
        this.http.get(`${environment.apiBaseUrl}/grupos-usuario`).subscribe({
            next: (res) => {
                this.grupos = res;
                this.atualizarPaginacao();
            },
            error: () => {
                Swal.fire('Erro', 'Não foi possível carregar os grupos de usuário.', 'error');
            }
        });
    }
    atualizarPaginacao() {
        const inicio = this.paginaAtual * this.itensPorPagina;
        const fim = inicio + this.itensPorPagina;
        this.gruposPaginados = this.grupos.slice(inicio, fim);
        this.paginas = Array(Math.ceil(this.grupos.length / this.itensPorPagina))
            .fill(0)
            .map((_, i) => i);
    }
    mudarPagina(p) {
        if (p < 0 || p >= this.paginas.length)
            return;
        this.paginaAtual = p;
        this.atualizarPaginacao();
    }
    // ✅ Corrigido: redireciona corretamente
    novoGrupoUsuario() {
        this.router.navigate(['/home/_adm/gruposUsuarioForm']);
    }
    // ✅ Corrigido: rota para edição com ID
    editar(g) {
        this.router.navigate([`/home/_adm/gruposUsuarioForm/`, g.idGrupoUsuario]);
    }
    vinculo(g) {
        this.router.navigate([`/home/_adm/vinculoFuncionario`, g.idGrupoUsuario]);
    }
    excluir(g) {
        Swal.fire({
            title: 'Excluir grupo?',
            text: `Tem certeza que deseja excluir o grupo "${g.nomeGrupoUsuario}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                this.http.delete(`${environment.apiBaseUrl}/grupos-usuario/${g.idGrupoUsuario}`).subscribe({
                    next: () => {
                        this.grupos = this.grupos.filter(x => x.idGrupoUsuario !== g.idGrupoUsuario);
                        this.atualizarPaginacao();
                        Swal.fire('Excluído!', 'Grupo removido com sucesso.', 'success');
                    },
                    error: () => {
                        Swal.fire('Erro', 'Não foi possível excluir o grupo.', 'error');
                    }
                });
            }
        });
    }
    // 🔒 Ações extras (placeholders)
    configurarPermissoes(g) {
        this.router.navigate([`/home/_adm/vinculoRegras/${g.idGrupoUsuario}`]);
    }
    gerenciarUsuarios(g) {
        this.router.navigate([`/home/_adm/vinculoHeranca/${g.idGrupoUsuario}`]);
    }
};
ListaGrupoUsuarioComponent = __decorate([
    Component({
        selector: 'app-lista-grupo-usuario',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './grupos-usuarios-listar.component.html',
        styleUrls: ['./grupos-usuarios-listar.component.css']
    })
], ListaGrupoUsuarioComponent);
export { ListaGrupoUsuarioComponent };
//# sourceMappingURL=grupos-usuarios-listar.component.js.map