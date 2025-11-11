import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcao } from './funcoes.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncoesService {
    
   private apiUrl = `${environment.apiBaseUrl}/funcoes`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Funcao[]> {
    return this.http.get<Funcao[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Funcao> {
    return this.http.get<Funcao>(`${this.apiUrl}/${id}`);
  }

  criar(funcao: Funcao): Observable<Funcao> {
    return this.http.post<Funcao>(this.apiUrl, funcao);
  }

  atualizar(id: number, funcao: Funcao): Observable<Funcao> {
    return this.http.put<Funcao>(`${this.apiUrl}/${id}`, funcao);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
