import { Injectable } from '@angular/core';
import { PedidoService } from '../../pedidos/pedido.service';
import { map } from 'rxjs/operators';
import { DashboardData } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {

  constructor(private pedidoService: PedidoService) {}

  getDashboardData() {
    return this.pedidoService.listarTodos().pipe(
      map((pedidos): DashboardData => {

        const total = pedidos.length;

        // ✅ PRODUÇÃO
        const producao = pedidos.filter(p =>
          p.status === 'PRODUCAO' || p.status === 'NOVO'
        ).length;

        // ✅ ATRASADOS (comparando data)
        const hoje = new Date();
        const atrasados = pedidos.filter(p =>
          !p.entregue &&
          p.dtPrevisaoPedido &&
          new Date(p.dtPrevisaoPedido) < hoje
        ).length;

        // ✅ ENTREGUES
        const entregues = pedidos.filter(p =>
          p.entregue || p.status === 'ENTREGUE'
        ).length;

        // ✅ TAXAS
        const taxaProducao = total ? (producao / total) * 100 : 0;
        const taxaAtraso = total ? (atrasados / total) * 100 : 0;
        const taxaEntrega = total ? (entregues / total) * 100 : 0;

        // ✅ RANKING CLIENTES
        const clientesMap = {};

        pedidos.forEach(p => {
          const nome = p.nomePessoa || 'Sem nome';
          clientesMap[nome] = (clientesMap[nome] || 0) + 1;
        });

        const rankingClientes = Object.keys(clientesMap)
          .map(nome => ({
            nome,
            total: clientesMap[nome]
          }))
          .sort((a, b) => b.total - a.total)
          .slice(0, 5);

        // ✅ EVOLUÇÃO POR MÊS (baseado em dtEntradaPedido)
        const mapaMeses = {};

        pedidos.forEach(p => {

          if (!p.dtEntradaPedido) return;

          const data = new Date(p.dtEntradaPedido);

          const label = data.toLocaleDateString('pt-BR', {
            month: 'short',
            year: 'numeric'
          });

          if (!mapaMeses[label]) {
            mapaMeses[label] = {
              entregues: 0,
              atrasados: 0,
              producao: 0
            };
          }

          if (p.entregue || p.status === 'ENTREGUE') {
            mapaMeses[label].entregues++;
          } else if (
            p.dtPrevisaoPedido &&
            new Date(p.dtPrevisaoPedido) < hoje
          ) {
            mapaMeses[label].atrasados++;
          } else {
            mapaMeses[label].producao++;
          }
        });

        const labels = Object.keys(mapaMeses);

        const evolucao = {
          labels,
          entregues: labels.map(l => mapaMeses[l].entregues),
          atrasados: labels.map(l => mapaMeses[l].atrasados),
          producao: labels.map(l => mapaMeses[l].producao)
        };

        // ✅ URGÊNCIA
        const urgente = pedidos.filter(p => p.urgente).length;
        const normal = pedidos.filter(p => !p.urgente).length;

        return {
          total,
          producao,
          atrasados,
          entregues,
          taxaProducao,
          taxaAtraso,
          taxaEntrega,
          rankingClientes,
          evolucao,
          urgencia: {
            urgente,
            normal
          }
        };
      })
    );
  }
}