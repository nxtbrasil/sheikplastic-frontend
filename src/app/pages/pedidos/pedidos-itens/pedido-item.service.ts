import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoItem } from './pedido-item.model';
import { environment } from '../../../../environments/environment';
import { PedidoItensResponse } from './pedido-itens-response.model';


@Injectable({
  providedIn: 'root'
})
export class PedidoItemService {

private readonly apiUrl = `${environment.apiBaseUrl}/pedidos`;

  constructor(private http: HttpClient) {}

listarPorPedido(idPedido: number): Observable<PedidoItensResponse> {
  return this.http.get<PedidoItensResponse>(`${this.apiUrl}/${idPedido}/itens`);
}
  excluir(idPessoa: number, idPedido: number, seqProduto: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idPessoa}/${idPedido}/itens/${seqProduto}`);
  }

  buscarItem(
    pessoaId: number,
    pedidoId: number,
    seqProduto: number
  ): Observable<PedidoItem> {
    return this.http.get<PedidoItem>(
      `${this.apiUrl}/${pessoaId}/${pedidoId}/itens/${seqProduto}`
    );
  }


    atualizar(pessoaId: number, idPedido: number, seqProduto: number, payload: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${pessoaId}/${idPedido}/itens/${seqProduto}`, payload);
  }

    criar(pessoaId: number, idPedido: number, payload: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${pessoaId}/${idPedido}/itens`, payload);
  }

  listarProdutosPessoa(idPessoa: number): Observable<any[]> {
  return this.http.get<any[]>(
    `${environment.apiBaseUrl}/pessoas-produtos/${idPessoa}/produtos`
  );
}
}
