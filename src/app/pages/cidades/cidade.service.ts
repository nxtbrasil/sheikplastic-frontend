import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cidade } from './cidade.model';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  private apiUrl = `${environment.apiBaseUrl}/cidades`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Cidade[]> {
    return this.http.get<Cidade[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Cidade> {
    return this.http.get<Cidade>(`${this.apiUrl}/${id}`);
  }

  criar(cidade: Cidade): Observable<Cidade> {
    return this.http.post<Cidade>(this.apiUrl, cidade);
  }

  atualizar(id: number, cidade: Cidade): Observable<Cidade> {
    return this.http.put<Cidade>(`${this.apiUrl}/${id}`, cidade);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
