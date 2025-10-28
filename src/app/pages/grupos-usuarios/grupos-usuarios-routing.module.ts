import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaGrupoUsuarioComponent } from './grupos-usuarios-listar/grupos-usuarios-listar.component';
import { GruposUsuariosEditarComponent } from './grupos-usuarios-editar/grupos-usuarios-editar.component';

const routes: Routes = [
  { path: 'gruposUsuarioListar', component: ListaGrupoUsuarioComponent },
  { path: 'gruposUsuarioForm', component: GruposUsuariosEditarComponent },
  { path: 'gruposUsuarioForm/:id', component: GruposUsuariosEditarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GruposUsuariosRoutingModule {}
