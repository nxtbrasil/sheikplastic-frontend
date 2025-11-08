import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GrupoUsuarioHerancaResponse } from './grupo-usuario-heranca.model';

@Injectable({
  providedIn: 'root',
})
export class GrupoUsuarioHerancaService {
  private baseUrl = 'http://localhost:8181/api/grupos'; // ajuste conforme seu backend

  constructor(private http: HttpClient) {}

  listar(idGrupoPai: number): Observable<GrupoUsuarioHerancaResponse> {
    return this.http.get<GrupoUsuarioHerancaResponse>(`${this.baseUrl}/${idGrupoPai}/herancas`);
  }

  listarTodosGrupos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  vincular(idGrupoPai: number, idGrupoFilho: number): Observable<string> {
    // ✅ responseType deve ir nas opções do request, não no body
    return this.http.post(
      `${this.baseUrl}/${idGrupoPai}/herancas/${idGrupoFilho}`,
      {},
      { responseType: 'text' }
    );
  }

  desvincular(idGrupoPai: number, idGrupoFilho: number): Observable<string> {
    // ✅ mesma correção aqui
    return this.http.delete(
      `${this.baseUrl}/${idGrupoPai}/herancas/${idGrupoFilho}`,
      { responseType: 'text' }
    );
  }
  
}
