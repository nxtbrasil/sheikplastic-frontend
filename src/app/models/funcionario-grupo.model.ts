export interface FuncionarioGrupo {
  idFuncionario: number;
  nomeFuncionario: string;
  emailFuncionario: string;
  vinculado: boolean;
  nomeGrupo?: string | null;
  qtdVinculos?: number;
}
