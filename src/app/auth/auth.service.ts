import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = environment.apiBaseUrl + '/auth';
  

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(this.api + '/login', { email, senha }).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('idFuncionario', res.idFuncionario?.toString() || '');
          localStorage.setItem('userName', res.nomeFuncionario || '');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('idFuncionario');
    localStorage.removeItem('userName');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLogged(): boolean {
    return !!this.getToken();
  }

  getIdFuncionario(): string | null {
    return localStorage.getItem('idFuncionario');
  }

  criarUsuario(usuario: any) {
  return this.http.post(`${this.api}/funcionarios`, usuario);
}

}