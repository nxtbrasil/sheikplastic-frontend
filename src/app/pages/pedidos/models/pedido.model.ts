export interface Pedido {
  idPedido: number;
  nomePessoa: string;
  dtEntradaPedido: string;
  dtPrevisaoPedido: string;
  nomeFuncionario: string;
  urgente: boolean;
  entregue: boolean;
  ativo: boolean;
  qtdItens: number;
  qtdEntregue: number;
  valorPedido: number;
  status: string;
}
