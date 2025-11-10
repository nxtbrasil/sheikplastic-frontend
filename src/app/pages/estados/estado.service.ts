import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estado } from './estado.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {

  private apiUrl = `${environment.apiBaseUrl}/estados`;
  

  constructor(private http: HttpClient) { }

  listar(): Observable<Estado[]> {
    return this.http.get<Estado[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<Estado> {
    return this.http.get<Estado>(`${this.apiUrl}/${id}`);
  }

  salvar(estado: Estado): Observable<Estado> {
    return this.http.post<Estado>(this.apiUrl, estado);
  }

  atualizar(id: number, estado: Estado): Observable<Estado> {
    return this.http.put<Estado>(`${this.apiUrl}/${id}`, estado);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
