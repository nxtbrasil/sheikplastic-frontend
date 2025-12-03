import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PessoaContatoService {

  private baseUrl = `${environment.apiBaseUrl}/pessoa-contato`;

  constructor(private http: HttpClient) {}

  /** --------------------------
   *  LISTAR CONTATOS POR PESSOA
   *  -------------------------- */
  listarPorPessoa(idPessoa: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${idPessoa}`);
  }

  /** --------------------------
   *  CRIAR CONTATO
   *  POST /api/pessoa-contato
   *  -------------------------- */
  criar(contato: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, contato);
  }

  /** --------------------------
   *  EDITAR CONTATO
   *  PUT /api/pessoa-contato/{idPessoa}/{seqContato}
   *  -------------------------- */
  atualizar(idPessoa: number, seqContato: number, contato: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${idPessoa}/${seqContato}`, contato);
  }

  /** --------------------------
   *  EXCLUIR CONTATO
   *  DELETE /api/pessoa-contato/{idPessoa}/{seqContato}
   *  -------------------------- */
  remover(idPessoa: number, seqContato: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${idPessoa}/${seqContato}`);
  }

}
