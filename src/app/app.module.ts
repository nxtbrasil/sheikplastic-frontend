import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SubmenuComponent } from './shared/menu/submenu.component';

import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { MenuService } from './home/menu.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NovoUsuarioComponent } from './auth/novo-usuario/novo-usuario.component';
import { TrocaSenhaComponent } from './auth/troca-senha/troca-senha.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    SubmenuComponent,
    NovoUsuarioComponent,
    TrocaSenhaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
   RouterModule.forRoot([
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      // Rotas que serão exibidas DENTRO do layout da Home
      { path: 'troca-senha', component: TrocaSenhaComponent },
      { path: 'novo-usuario', component: NovoUsuarioComponent },
      // você pode incluir aqui outros módulos ou páginas também
    ]
  },

  { path: '**', redirectTo: 'home' }
], { scrollPositionRestoration: 'enabled' })
  ],
  providers: [
    AuthService,
    MenuService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }