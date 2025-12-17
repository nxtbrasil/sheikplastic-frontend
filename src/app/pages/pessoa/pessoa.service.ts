import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pessoa } from './pessoa.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PessoaProduto } from './pessoa-produto.model';

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  private baseUrl = `${environment.apiBaseUrl}/pessoa`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(`${this.baseUrl}/listar`);
  }

  buscarPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  /** --------------------------
   *  CRIAR
   *  -------------------------- */
  salvar(pessoa: Pessoa): Observable<Pessoa> {
    return this.http.post<Pessoa>(`${this.baseUrl}`, pessoa);
  }

  criar(pessoa: any): Observable<Pessoa> {
    return this.salvar(pessoa);
  }

  /** --------------------------
   *  EDITAR
   *  -------------------------- */
  atualizar(id: number, pessoa: Pessoa): Observable<Pessoa> {
    return this.http.put<Pessoa>(`${this.baseUrl}/${id}`, pessoa);
  }

  editar(id: number, pessoa: any): Observable<Pessoa> {
    return this.atualizar(id, pessoa);
  }

  /** --------------------------
   *  REMOVER
   *  -------------------------- */
  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  /** --------------------------
   *  LISTAS AUXILIARES
   *  -------------------------- */
  listarCondicoesPagamento(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/condicoes-pagamento`);
  }

  listarEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/estados`);
  }

  listarCidadesPorEstado(estadoId: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/cidades/estado/${estadoId}`);
  }

  listarCidades(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/cidades`);
  }
  /** --------------------------
   *  BUSCAR CEP
   *  -------------------------- */
  buscarCep(cep: string) {
    const cleanCep = cep.replace(/\D/g, '');
    return this.http.get(`https://viacep.com.br/ws/${cleanCep}/json/`);
  }
  gerarBackupExcel() {
    return this.http.get(`${environment.apiBaseUrl}/pessoa/backup/csv`, {
      responseType: 'blob'
    });
  }

  listarContatosPorPessoa(idPessoa: number) {
    return this.http.get<any[]>(`${environment.apiBaseUrl}/pessoa-contato/${idPessoa}`);
  }

  listarProdutosPessoa(idPessoa: number): Observable<PessoaProduto[]> {
    return this.http.get<PessoaProduto[]>(
      `${environment.apiBaseUrl}/pessoas-produtos/${idPessoa}/produtos`
    );
  }

  buscarHistoricoPreco(idPessoa: number, seqProduto: number) {
    return this.http.get<any[]>(
      `${environment.apiBaseUrl}/pessoas-produtos/${idPessoa}/produtos/${seqProduto}/historico`
    );
  }

  buscarPorPessoaESeq(
    idPessoa: number,
    seqProduto: number
  ): Observable<PessoaProduto> {
    return this.http.get<PessoaProduto>(
      `${environment.apiBaseUrl}/pessoas-produtos/${idPessoa}/produtos/${seqProduto}`
    );
  }


  salvarProdutoPessoa(
    idPessoa: number,
    payload: any
  ) {
    return this.http.post(
      `${environment.apiBaseUrl}/pessoas-produtos/${idPessoa}/produtos`,
      payload
    );

  }

  deletarProduto(idPessoa: number, seqProduto: number) {
    return this.http.delete<void>(
      `${environment.apiBaseUrl}/pessoas-produtos/${idPessoa}/produtos/${seqProduto}`
    );
  }

}
