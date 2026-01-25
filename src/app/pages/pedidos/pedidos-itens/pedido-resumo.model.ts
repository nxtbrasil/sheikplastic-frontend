export interface PedidoResumo {
  idPessoa: number;
  nomePessoa: string;
  nomeFuncionario: string;
  descricaoCondicaoPagamento: string;
  dtEntradaPedido: string;
  dtPrevisaoPedido: string;
  dtEntregaPedido: string | null;
  qtdItens: number;
  valorPedido: number;
  valorEntregue: number;
  urgente: boolean;
  entregue: boolean;
}
