export interface DashboardData {
  total: number;
  producao: number;
  atrasados: number;
  entregues: number;

  taxaProducao: number;
  taxaAtraso: number;
  taxaEntrega: number;

  rankingClientes: {
    nome: string;
    total: number;
  }[];

  evolucao: {
    labels: string[];
    entregues: number[];
    atrasados: number[];
    producao: number[];
  };

  urgencia: {
    urgente: number;
    normal: number;
  };

  
}