import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaGrupoUsuarioComponent } from './grupos-usuarios-listar/grupos-usuarios-listar.component';
import { GruposUsuariosEditarComponent } from './grupos-usuarios-editar/grupos-usuarios-editar.component';
import { VinculoFuncionarioGrupoComponent } from './vinculos-usuarios/vinculo-funcionario-grupo.component';
import { VinculoRegraGrupoComponent } from './vinculo-regras/vinculo-regra-grupo.component';

const routes: Routes = [
  { path: 'gruposUsuarioListar', component: ListaGrupoUsuarioComponent },
  { path: 'gruposUsuarioForm', component: GruposUsuariosEditarComponent },
  { path: 'gruposUsuarioForm/:id', component: GruposUsuariosEditarComponent },
  { path: 'vinculoFuncionario/:id', component: VinculoFuncionarioGrupoComponent },
  { path: 'vinculoRegras/:id', component: VinculoRegraGrupoComponent } // 👈 nova rota para vincular regras
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposUsuariosRoutingModule {}
