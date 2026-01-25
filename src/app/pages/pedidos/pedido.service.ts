import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PedidoItem } from './pedidos-itens/pedido-item.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private readonly apiUrl = `${environment.apiBaseUrl}/pedidos`;

  constructor(private http: HttpClient) {}

  // =============================
  // LISTAR TODOS
  // =============================
  listarTodos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // =============================
  // BUSCAR POR ID
  // =============================
  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  private formatarData(data: any): string | null {
  if (!data) return null;

  if (typeof data === 'string') {
    return data.substring(0, 10);
  }

  const d = new Date(data);
  return d.toISOString().substring(0, 10);
}

  // =============================
  // CRIAR
  // =============================
criar(form: any): Observable<any> {

  const payload = {
    idPessoa: form.idPessoa,
    idFuncionario: form.idFuncionario,
    idCondicaoPagamento: form.idCondicaoPagamento,

dtEntradaPedido: this.dataAtual(),
    dtPrevisaoPedido: this.formatarData(form.dtPrevisaoPedido),
    dtEntregaPedido: this.formatarData(form.dtEntregaPedido),

    nomeSolicitante: form.nomeSolicitante,
    urgente: form.urgente ?? false,
    observacao: form.observacao,
    entregue: form.entregue ?? false,
    ativo: form.ativo ?? true
  };

  return this.http.post<any>(this.apiUrl, payload);
}

private dataAtual(): string {
  return new Date().toISOString().substring(0, 10);
}

  // =============================
  // ATUALIZAR
  // =============================
  atualizar(form: any): Observable<any> {

    const payload = {
    idPessoa: form.idPessoa,
    idFuncionario: form.idFuncionario,
    idCondicaoPagamento: form.idCondicaoPagamento,

dtEntradaPedido: this.dataAtual(),
    dtPrevisaoPedido: this.formatarData(form.dtPrevisaoPedido),
    dtEntregaPedido: this.formatarData(form.dtEntregaPedido),

    nomeSolicitante: form.nomeSolicitante,
    urgente: form.urgente ?? false,
    observacao: form.observacao,
    entregue: form.entregue ?? false,
    ativo: form.ativo ?? true
  };
    return this.http.put<any>(`${this.apiUrl}/${form.idPedido}`, payload);
  }

  // =============================
  // EXCLUIR
  // =============================
  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // =============================
  // EXCLUIR EM LOTE
  // =============================
  excluirEmLote(ids: number[]): Observable<void> {
    return this.http.post<void>(
      `${this.apiUrl}/excluir-lote`,
      ids
    );
  }

listarPedidos(filtro: any): Observable<any[]> {
  let httpParams = new HttpParams();

  Object.keys(filtro).forEach(key => {
    const value = filtro[key];
    
    // Validamos se o valor existe e não é string vazia
    // Nota: Mantemos o 0 (zero) e o false como valores válidos
    if (value !== null && value !== undefined && value !== '') {
      
      // Se for uma data (objeto Date do JS), convertemos para string ISO
      if (value instanceof Date) {
        httpParams = httpParams.set(key, value.toISOString());
      } else {
        httpParams = httpParams.set(key, value.toString());
      }
    }
  });

  return this.http.get<any[]>(this.apiUrl, { params: httpParams });
}

  listarPessoas() {
    return this.http.get<any[]>('/api/pessoas');
  }

  listarFuncionarios() {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/funcionarios`);
  }

  listarCondicoesPagamento() {
    return this.http.get<any[]>('/api/condicoes-pagamento');
  }

   listarProdutosPessoa(pessoaId: number, pedidoId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${environment.apiBaseUrl}/${pessoaId}/${pedidoId}/produtos`
    );
  }

  buscarItem(
    pedidoId: number,
    pessoaId: number,
    seqProduto: number
  ): Observable<PedidoItem> {
    return this.http.get<PedidoItem>(
      `${environment.apiBaseUrl}/${pessoaId}/${pedidoId}/itens/${seqProduto}`
    );
  }



}
