import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TipoContato } from './tipo-contato.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoContatoService {

    private readonly apiUrl = `${environment.apiBaseUrl}/tipos-contato`;

  constructor(private http: HttpClient) {}

  listar(): Observable<TipoContato[]> {
    return this.http.get<TipoContato[]>(this.apiUrl);
  }

  buscarPorDescricao(descricao: string): Observable<TipoContato[]> {
    return this.http.get<TipoContato[]>(`${this.apiUrl}?descricao=${descricao}`);
  }

  buscarPorId(id: number): Observable<TipoContato> {
    return this.http.get<TipoContato>(`${this.apiUrl}/${id}`);
  }

  salvar(tipo: TipoContato): Observable<TipoContato> {
    return this.http.post<TipoContato>(this.apiUrl, tipo);
  }

  atualizar(tipo: TipoContato): Observable<TipoContato> {
    return this.http.put<TipoContato>(`${this.apiUrl}/${tipo.idTipoContato}`, tipo);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
