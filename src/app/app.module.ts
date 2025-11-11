import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SubmenuComponent } from './shared/menu/submenu.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { MenuService } from './home/menu.service';
import { NovoUsuarioComponent } from './auth/novo-usuario/novo-usuario.component';
import { TrocaSenhaComponent } from './auth/troca-senha/troca-senha.component';
import { MeuPerfilComponent } from './auth/meu-perfil/meu-perfil.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SubmenuComponent,
    NovoUsuarioComponent,
    MeuPerfilComponent,
    TrocaSenhaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot(
      [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'login', component: LoginComponent },
        {
          path: 'home',
          component: HomeComponent,
          canActivate: [AuthGuard],
          children: [
            { path: 'troca-senha', component: TrocaSenhaComponent },
            { path: 'novo-usuario', component: NovoUsuarioComponent },
            { path: 'meu-perfil', component: MeuPerfilComponent },

            // ✅ Módulo lazy de funcionários com os paths da API
            {
              path: '_adm',
              loadChildren: () =>
                import('./pages/funcionarios/funcionarios-routing.module').then(
                  (m) => m.FuncionariosRoutingModule
                )
            },
            // ✅ Módulo lazy de Grupos de Usuários
            {
              path: '_adm',
              loadChildren: () =>
                import('./pages/grupos-usuarios/grupos-usuarios-routing.module').then(
                  (m) => m.GruposUsuariosRoutingModule
                )
            },
            // ✅ Módulo lazy de Grupos de Usuários
            {
              path: '_cad',
              loadChildren: () =>
                import('./pages/cidades/cidades-routing.module').then(
                  (m) => m.CidadesRoutingModule
                )
            },
            {
              path: '_cad',
              loadChildren: () =>
                import('./pages/condicao-pagamento/condicoes-pagamento-routing.module').then(
                  (m) => m.CondicoesPagamentoRoutingModule
                )
            },
            {
              path: '_cad',
              loadChildren: () =>
                import('./pages/estados/estados-routing.module').then(
                  (m) => m.EstadosRoutingModule
                )
            },
             {
              path: '_cad',
              loadChildren: () =>
                import('./pages/funcoes/funcoes-routing.module').then(
                  (m) => m.FuncoesRoutingModule
                )
            }
          ]
        },
        { path: '**', redirectTo: 'home' }
      ],
      { scrollPositionRestoration: 'enabled' }
    )
  ],
  providers: [
    AuthService,
    MenuService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
