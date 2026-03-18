import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PedidoService } from '../pedidos/pedido.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('statusChart') statusChartRef!: ElementRef;
  @ViewChild('pieChart') pieChartRef!: ElementRef;
  @ViewChild('tempoChart') tempoChartRef!: ElementRef;

  pedidosRisco: any[] = [];

  private chartTempo: Chart | null = null;
  private chartStatus: Chart | null = null;
  private chartPie: Chart | null = null;

  public tempoMedioResolucao: number = 0;
  public taxaNoPrazo: number = 0;

  public funil = {
    total: 0,
    em_andamento: 0,
    atrasados: 0,
    entregues: 0,
    taxaProducao: 0,
    taxaAtraso: 0,
    taxaEntrega: 0
  };

  public rankingClientes: any[] = [];
  public loading = false;

  dataInicio: string = '';
  dataFim: string = '';

  constructor(private pedidoService: PedidoService) {
    const hoje = new Date();
    const diasAtras = new Date();
    diasAtras.setDate(hoje.getDate() - 30);

    this.dataInicio = diasAtras.toISOString().split('T')[0];
    this.dataFim = hoje.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.carregarGeral();
  }

  // =========================
  // 🔄 LOAD
  // =========================

  carregarGeral() {
    this.loading = true;
    this.dataInicio = '';
    this.dataFim = '';

    this.pedidoService.listarTodos().subscribe({
      next: (data) => {
        this.processarDashboard(data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  carregarDados() {
    if (!this.dataInicio || !this.dataFim) return;

    this.loading = true;

    this.pedidoService.listarTodosData(this.dataInicio, this.dataFim).subscribe({
      next: (data) => {
        this.processarDashboard(data);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  // =========================
  // 🧠 PROCESSAMENTO
  // =========================

  processarDashboard(pedidos: any[]) {

    // FUNIL
    this.funil.total = pedidos.length;

    this.funil.entregues = pedidos.filter(p =>
      p.entregue || p.status === 'ENTREGUE'
    ).length;

    this.funil.em_andamento = pedidos.filter(p =>
      p.status === 'EM_ANDAMENTO'
    ).length;

    this.funil.atrasados = pedidos.filter(p =>
      p.status === 'ATRASADO'
    ).length;

    const total = this.funil.total || 1;

    this.funil.taxaProducao = (this.funil.em_andamento / total) * 100;
    this.funil.taxaAtraso = (this.funil.atrasados / (this.funil.em_andamento || 1)) * 100;
    this.funil.taxaEntrega = (this.funil.entregues / total) * 100;

    // =========================
    // ⏱ TEMPO MÉDIO
    // =========================

    const entregues = pedidos.filter(p =>
      (p.entregue || p.status === 'ENTREGUE') && p.dtEntregaPedido
    );

    if (entregues.length > 0) {
      const totalDias = entregues.reduce((acc, p) => {
        const inicio = new Date(p.dtEntradaPedido);
        const fim = new Date(p.dtEntregaPedido);
        return acc + ((fim.getTime() - inicio.getTime()) / 86400000);
      }, 0);

      this.tempoMedioResolucao = totalDias / entregues.length;
    } else {
      this.tempoMedioResolucao = 0;
    }

    // =========================
    // 🎯 TAXA NO PRAZO
    // =========================

    const noPrazo = pedidos.filter(p =>
      (p.entregue || p.status === 'ENTREGUE') &&
      p.dtEntregaPedido &&
      p.dtPrevisaoPedido &&
      new Date(p.dtEntregaPedido) <= new Date(p.dtPrevisaoPedido)
    ).length;

    this.taxaNoPrazo = this.funil.entregues
      ? (noPrazo / this.funil.entregues) * 100
      : 0;

    // =========================
    // ⚠️ RISCO
    // =========================

    this.calcularRisco(pedidos);

    // =========================
    // 🏆 RANKING
    // =========================

    const counts: any = {};

    pedidos.forEach(p => {
      if (p.nomePessoa) {
        counts[p.nomePessoa] = (counts[p.nomePessoa] || 0) + 1;
      }
    });

    this.rankingClientes = Object.keys(counts)
      .map(k => ({ nome: k, total: counts[k] }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    // =========================
    // 📊 GRÁFICOS
    // =========================

    setTimeout(() => {
      this.initCharts(pedidos);
      this.initTempoChart(pedidos);
    }, 50);
  }

  // =========================
  // 📊 GRÁFICOS
  // =========================

  initCharts(pedidos: any[]) {

    if (this.chartStatus) this.chartStatus.destroy();
    if (this.chartPie) this.chartPie.destroy();

    // BAR
    this.chartStatus = new Chart(this.statusChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Pedidos'],
        datasets: [
          { label: 'Entregues', data: [this.funil.entregues] },
          { label: 'Atrasados', data: [this.funil.atrasados] },
          { label: 'Andamento', data: [this.funil.em_andamento] }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });

    // PIE
    this.chartPie = new Chart(this.pieChartRef.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Urgente', 'Normal'],
        datasets: [{
          data: [
            pedidos.filter(p => p.urgente).length,
            pedidos.filter(p => !p.urgente).length
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  // =========================
  // ⏱ TEMPO POR PERÍODO
  // =========================

 initTempoChart(pedidos: any[]) {

  if (this.chartTempo) this.chartTempo.destroy();

  const hoje = new Date();

  // 🔥 gera os últimos 12 meses
  const mesesValidos: string[] = [];

  for (let i = 11; i >= 0; i--) {
    const d = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1);
    const mes = String(d.getMonth() + 1).padStart(2, '0');
    mesesValidos.push(`${d.getFullYear()}-${mes}`);
  }

  const grupos: any = {};

  pedidos.forEach(p => {

    if (
      (p.entregue || p.status === 'ENTREGUE') &&
      p.dtEntregaPedido &&
      p.dtEntradaPedido
    ) {

      const dataEntrega = new Date(p.dtEntregaPedido);

      const mes = String(dataEntrega.getMonth() + 1).padStart(2, '0');
      const chave = `${dataEntrega.getFullYear()}-${mes}`;

      // 🔥 filtra só os 12 meses
      if (!mesesValidos.includes(chave)) return;

      if (!grupos[chave]) grupos[chave] = [];

      const inicio = new Date(p.dtEntradaPedido);
      const fim = new Date(p.dtEntregaPedido);

      const dias = (fim.getTime() - inicio.getTime()) / 86400000;

      grupos[chave].push(dias);
    }
  });

  const labels: string[] = [];
  const valores: number[] = [];

  // 🔥 garante ordem correta e meses vazios com 0
  mesesValidos.forEach(chave => {

    const lista = grupos[chave] || [];

    const media = lista.length
      ? lista.reduce((a: number, b: number) => a + b, 0) / lista.length
      : 0;

    const [ano, mes] = chave.split('-');

    labels.push(`${mes}/${ano}`);
    valores.push(Number(media.toFixed(2)));
  });

  this.chartTempo = new Chart(this.tempoChartRef.nativeElement, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Tempo Médio (dias)',
          data: valores,
          tension: 0.3,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

  // =========================
  // ⚠️ RISCO
  // =========================

  isPedidoEmRisco(p: any): boolean {

    if (p.entregue) return false;

    const hoje = new Date();
    const previsao = new Date(p.dtPrevisaoPedido);

    const diff = (previsao.getTime() - hoje.getTime()) / 86400000;

    return diff <= 2;
  }

  calcularRisco(pedidos: any[]) {
    this.pedidosRisco = pedidos.filter(p => this.isPedidoEmRisco(p));
  }

}