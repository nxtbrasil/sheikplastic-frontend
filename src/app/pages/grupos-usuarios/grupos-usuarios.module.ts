import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GruposUsuariosRoutingModule } from './grupos-usuarios-routing.module';
import { ListaGrupoUsuarioComponent } from './grupos-usuarios-listar/grupos-usuarios-listar.component';
import { GruposUsuariosEditarComponent } from './grupos-usuarios-editar/grupos-usuarios-editar.component';
import { VinculoFuncionarioGrupoComponent } from './vinculos-usuarios/vinculo-funcionario-grupo.component';
import { VinculoRegraGrupoComponent } from './vinculo-regras/vinculo-regra-grupo.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    VinculoFuncionarioGrupoComponent,
    VinculoRegraGrupoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GruposUsuariosRoutingModule,
    ListaGrupoUsuarioComponent,
    GruposUsuariosEditarComponent,
    FormsModule,
    DragDropModule,
    MatProgressSpinnerModule,
    MatCardModule,
  MatIconModule
  ],
})
export class GruposUsuariosModule {}