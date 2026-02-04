import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment.prod";

@Injectable({ providedIn: 'root' })
export class TransportadoraService {


  private readonly api = `${environment.apiBaseUrl}/transportadoras`;

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get<any[]>(this.api);
  }

  buscarPorId(id: number) {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  salvar(dto: any) {


    const payload = {
      nome: dto.nome,
      cnpj: dto.cnpj,
      telefone: dto.telefone,
      email: dto.email,
      logradouroEnderecoPessoa: dto.logradouroEnderecoPessoa,
      numeroEnderecoPessoa: dto.numeroEnderecoPessoa,
      complementoEnderecoPessoa: dto.complementoEnderecoPessoa,
      bairroEnderecoPessoa: dto.bairroEnderecoPessoa,
      cidade: {
        idCidade: dto.idCidade
      },
      cepEnderecoPessoa: dto.cepEnderecoPessoa,
      ativo: dto.ativo ?? true
    };


    return this.http.post(this.api, payload);
  }

  atualizar(id: number, dto: any) {

  const payload = {
      nome: dto.nome,
      cnpj: dto.cnpj,
      telefone: dto.telefone,
      email: dto.email,
      logradouroEnderecoPessoa: dto.logradouroEnderecoPessoa,
      numeroEnderecoPessoa: dto.numeroEnderecoPessoa,
      complementoEnderecoPessoa: dto.complementoEnderecoPessoa,
      bairroEnderecoPessoa: dto.bairroEnderecoPessoa,
      cidade: {
        idCidade: dto.idCidade
      },
      cepEnderecoPessoa: dto.cepEnderecoPessoa,
      ativo: dto.ativo ?? true
    };


    return this.http.put(`${this.api}/${id}`, payload);
  }

  deletar(id: number) {
    return this.http.delete(`${this.api}/${id}`);
  }



}
