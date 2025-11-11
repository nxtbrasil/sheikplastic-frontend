import { Estado } from '../estados/estado.model';

export interface Cidade {
  idCidade?: number;
  nomeCidade: string;
  estado: Estado;
}