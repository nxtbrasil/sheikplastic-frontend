import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CondicaoPagamento } from './condicao-pagamento.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CondicaoPagamentoService {

    private apiUrl = `${environment.apiBaseUrl}/condicoes-pagamento`;

  constructor(private http: HttpClient) {}

  listar(): Observable<CondicaoPagamento[]> {
    return this.http.get<CondicaoPagamento[]>(this.apiUrl);
  }

  buscarPorId(id: number): Observable<CondicaoPagamento> {
    return this.http.get<CondicaoPagamento>(`${this.apiUrl}/${id}`);
  }

  salvar(condicao: CondicaoPagamento): Observable<CondicaoPagamento> {
    return this.http.post<CondicaoPagamento>(this.apiUrl, condicao);
  }

  atualizar(id: number, condicao: CondicaoPagamento): Observable<CondicaoPagamento> {
    return this.http.put<CondicaoPagamento>(`${this.apiUrl}/${id}`, condicao);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
