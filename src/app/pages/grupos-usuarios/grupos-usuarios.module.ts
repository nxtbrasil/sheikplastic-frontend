import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GruposUsuariosRoutingModule } from './grupos-usuarios-routing.module';
import { ListaGrupoUsuarioComponent } from './grupos-usuarios-listar/grupos-usuarios-listar.component';
import { GruposUsuariosEditarComponent } from './grupos-usuarios-editar/grupos-usuarios-editar.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GruposUsuariosRoutingModule,
    ListaGrupoUsuarioComponent,
    GruposUsuariosEditarComponent
  ],
})
export class GruposUsuariosModule {}