import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaGrupoUsuarioComponent } from './grupos-usuarios-listar/grupos-usuarios-listar.component';
import { GruposUsuariosEditarComponent } from './grupos-usuarios-editar/grupos-usuarios-editar.component';
import { VinculoFuncionarioGrupoComponent } from './vinculos-usuarios/vinculo-funcionario-grupo.component';
import { VinculoRegraGrupoComponent } from './vinculo-regras/vinculo-regra-grupo.component';
import { GrupoUsuarioHerancaComponent } from './grupo-usuario-heranca/grupo-usuario-heranca.component'; // ✅ import do novo componente

const routes: Routes = [
  { path: 'gruposUsuarioListar', component: ListaGrupoUsuarioComponent },
  { path: 'gruposUsuarioForm', component: GruposUsuariosEditarComponent },
  { path: 'gruposUsuarioForm/:id', component: GruposUsuariosEditarComponent },
  { path: 'vinculoFuncionario/:id', component: VinculoFuncionarioGrupoComponent },
  { path: 'vinculoRegras/:id', component: VinculoRegraGrupoComponent },
  { path: 'vinculoHeranca/:id', component: GrupoUsuarioHerancaComponent }, // ✅ nova rota adicionada
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GruposUsuariosRoutingModule {}
