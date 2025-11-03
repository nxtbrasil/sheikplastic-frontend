export interface GrupoUsuarioHerancaResponse {
  grupoPai: GrupoPaiDTO;
  filtroAplicado?: string | null;
  grupos: GrupoFilhoDTO[];
}

export interface GrupoPaiDTO {
  id: number;
  nome: string;
}

export interface GrupoFilhoDTO {
  idGrupoUsuario: number;
  nomeGrupoUsuario: string;
  vinculado: boolean;
}
