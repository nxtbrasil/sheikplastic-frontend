export interface Contato {
  id: number;
  seqContato: number;
  idTipoContato: number;
  tipoContatoDescricao?: string;
  contato: string;
  observacao?: string;
}

export interface Pessoa {
  id: number;
  tipoPessoa: string;
  documento: string;
  identidade: string;
  dataCadastro: string;
  nome: string;
  apelido?: string;
  idCondicaoPagamento?: number;
  contatos?: Contato[]; 
  cepPessoaString?: string;
  logradouroPessoa?: string;
  numeroPessoa?: string;
  complementoPessoa?: string;
  bairroPessoa?: string;
  cidadePessoa?: string;
  estadoPessoa?: string;
  ativo: boolean;
  observacao?: string;
  identidadePessoa?: string; // RG ou Inscrição Estadual

}
