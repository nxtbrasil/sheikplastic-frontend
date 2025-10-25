import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private api = environment.apiBaseUrl + '/funcionarios';

  constructor(private http: HttpClient) {}

  criarUsuario(usuario: any) {
    return this.http.post(this.api, usuario);
  }
}
