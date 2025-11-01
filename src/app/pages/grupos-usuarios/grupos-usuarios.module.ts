import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GruposUsuariosRoutingModule } from './grupos-usuarios-routing.module';
import { ListaGrupoUsuarioComponent } from './grupos-usuarios-listar/grupos-usuarios-listar.component';
import { GruposUsuariosEditarComponent } from './grupos-usuarios-editar/grupos-usuarios-editar.component';
import { VinculoFuncionarioGrupoComponent } from './vinculos-usuarios/vinculo-funcionario-grupo.component';

@NgModule({
  declarations: [
    VinculoFuncionarioGrupoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GruposUsuariosRoutingModule,
    ListaGrupoUsuarioComponent,
    GruposUsuariosEditarComponent,
    FormsModule
  ],
})
export class GruposUsuariosModule {}