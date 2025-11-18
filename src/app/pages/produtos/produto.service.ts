import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from './produto.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

    private readonly API = `${environment.apiBaseUrl}/produtos`;

  constructor(private http: HttpClient) {}

listar(nomeProduto?: string): Observable<Produto[]> {
  const url = nomeProduto ? `${this.API}?nomeProduto=${nomeProduto}` : this.API;
  return this.http.get<Produto[]>(url);
}
  

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.API}/${id}`);
  }

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(this.API, produto);
  }

  atualizar(produto: Produto): Observable<Produto> {
    return this.http.put<Produto>(`${this.API}/${produto.idProduto}`, produto);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
