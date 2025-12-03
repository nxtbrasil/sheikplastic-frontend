import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { NgxCurrencyDirective } from 'ngx-currency';

// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SubmenuComponent } from './shared/menu/submenu.component';
import { NovoUsuarioComponent } from './auth/novo-usuario/novo-usuario.component';
import { TrocaSenhaComponent } from './auth/troca-senha/troca-senha.component';
import { MeuPerfilComponent } from './auth/meu-perfil/meu-perfil.component';

// SERVIÇOS E GUARDS
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { MenuService } from './home/menu.service';
import { CidadesListComponent } from './pages/cidades/cidades-list/cidades-list.component';
import { CondicoesPagamentoListComponent } from './pages/condicao-pagamento/condicoes-pagamento-list/condicoes-pagamento-list.component';
import { EstadosRoutingModule } from './pages/estados/estados-routing.module';
import { CidadesFormComponent } from './pages/cidades/cidades-form/cidades-form.component';
import { FuncoesListComponent } from './pages/funcoes/funcoes-list/funcoes-list.component';
import { CondicoesPagamentoFormComponent } from './pages/condicao-pagamento/condicoes-pagamento-form/condicoes-pagamento-form.component';
import { PessoaListComponent } from './pages/pessoa/pessoa-list/pessoa-list.component';
import { EstadosListComponent } from './pages/estados/estados-list/estados-list.component';
import { EstadosFormComponent } from './pages/estados/estados-form/estados-form.component';
import { FuncionarioFormComponent } from './pages/funcionarios/funcionarios-form/funcionarios-form.component';
import { PessoaFormComponent } from './pages/pessoa/pessoa-form/pessoa-form.component';
import { ProdutosListComponent } from './pages/produtos/produtos-list/produtos-list.component';
import { ProdutosFormComponent } from './pages/produtos/produtos-form/produtos-form.component';
import { TipoContatoListComponent } from './pages/tipo-contato/tipo-contato-list/tipo-contato-list.component';
import { TipoContatoFormComponent } from './pages/tipo-contato/tipo-contato-form/tipo-contato-form.component';
import { FuncionariosListComponent } from './pages/funcionarios/funcionarios-list/funcionarios-list.component';
import { ListaGrupoUsuarioComponent } from './pages/grupos-usuarios/grupos-usuarios-listar/grupos-usuarios-listar.component';
import { GruposUsuariosEditarComponent } from './pages/grupos-usuarios/grupos-usuarios-editar/grupos-usuarios-editar.component';
import { VinculoRegraGrupoComponent } from './pages/grupos-usuarios/vinculo-regras/vinculo-regra-grupo.component';
import { GrupoUsuarioHerancaComponent } from './pages/grupos-usuarios/grupo-usuario-heranca/grupo-usuario-heranca.component';
import { VinculoFuncionarioGrupoComponent } from './pages/grupos-usuarios/vinculos-usuarios/vinculo-funcionario-grupo.component';

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
    HttpClientModule,
    ReactiveFormsModule,

    NgxMaskDirective,
    NgxCurrencyDirective,

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

            { path: 'cidades', component: CidadesListComponent },
            { path: 'cidadesForm', component: CidadesFormComponent },
            { path: 'cidadesForm/:id', component: CidadesFormComponent },

            { path: 'condicoespagamento', component: CondicoesPagamentoListComponent, },
            { path: 'condicoespagamentoForm', component: CondicoesPagamentoFormComponent, },
            { path: 'condicoespagamentoForm/:id', component: CondicoesPagamentoFormComponent, },

            { path: 'estados', component: EstadosListComponent, },
            { path: 'estadosForm', component: EstadosFormComponent, },
            { path: 'estadosForm/:id', component: EstadosFormComponent, },

            { path: 'funcoes', component: FuncoesListComponent, },
            { path: 'funcoesForm', component: FuncionarioFormComponent, },
            { path: 'funcoesForm/:id', component: FuncionarioFormComponent, },

            { path: 'pessoas', component: PessoaListComponent, },
            { path: 'pessoasForm', component: PessoaFormComponent, },
            { path: 'pessoasForm/:id', component: PessoaFormComponent, },

            { path: 'produtos', component: ProdutosListComponent, },
            { path: 'produtosForm', component: ProdutosFormComponent, },
            { path: 'produtosForm/:id', component: ProdutosFormComponent, },


            { path: 'tiposcontato', component: TipoContatoListComponent, },
            { path: 'tiposcontatoForm', component: TipoContatoFormComponent, },
            { path: 'tiposcontatoForm/:id', component: TipoContatoFormComponent, },

            { path: 'funcionarios', component: FuncionariosListComponent, },
            { path: 'funcionariosForm', component: FuncionarioFormComponent, },
            { path: 'funcionariosForm/:id', component: FuncionarioFormComponent, },

            { path: 'gruposusuario', component: ListaGrupoUsuarioComponent, },
            { path: 'gruposusuarioForm', component: GruposUsuariosEditarComponent, },

            { path: 'vinculoregra/:id', component: VinculoRegraGrupoComponent, },
            { path: 'vinculosusuario/:id', component: GruposUsuariosEditarComponent, },
            { path: 'herancausuario/:id', component: GrupoUsuarioHerancaComponent, },
            { path: 'vinculousuariogrupo/:id', component: VinculoFuncionarioGrupoComponent, },

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

    provideAnimationsAsync(),
    provideNgxMask()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
