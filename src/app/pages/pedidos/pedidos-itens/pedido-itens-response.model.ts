import { PedidoItem } from './pedido-item.model';
import { PedidoResumo } from './pedido-resumo.model';

export interface PedidoItensResponse {
  itens: PedidoItem[];
  pedido: PedidoResumo;
}
