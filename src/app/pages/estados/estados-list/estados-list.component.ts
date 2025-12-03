import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../estado.service';
import { Estado } from '../estado.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estados-list',
  templateUrl: './estados-list.component.html',
  styleUrls: ['./estados-list.component.css']
})
export class EstadosListComponent implements OnInit {

  estados: Estado[] = [];

  // 🔹 Paginação
  paginaAtual: number = 0; // começa em 0 para alinhar com outros componentes
  itensPorPagina: number = 10;
  paginas: number[] = [];

  constructor(private estadoService: EstadoService, private router: Router) {}

  ngOnInit(): void {
    this.carregarEstados();
  }

  carregarEstados(): void {
    this.estadoService.listar().subscribe(dados => {
      this.estados = dados;
      this.atualizarPaginas();
    });
  }

  atualizarPaginas(): void {
    const totalPaginas = Math.ceil(this.estados.length / this.itensPorPagina);
    this.paginas = Array.from({ length: totalPaginas }, (_, i) => i);
  }

  get estadosPaginados(): Estado[] {
    const inicio = this.paginaAtual * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    return this.estados.slice(inicio, fim);
  }

  get exibicaoInicio(): number {
    return this.estados.length === 0 ? 0 : this.paginaAtual * this.itensPorPagina + 1;
  }

  get exibicaoFim(): number {
    const fim = (this.paginaAtual + 1) * this.itensPorPagina;
    return fim > this.estados.length ? this.estados.length : fim;
  }

  get totalItens(): number {
    return this.estados.length;
  }

  mudarPagina(pagina: number): void {
    const totalPaginas = Math.ceil(this.estados.length / this.itensPorPagina);
    if (pagina >= 0 && pagina < totalPaginas) {
      this.paginaAtual = pagina;
    }
  }

  novoEstado(): void {
    this.router.navigate(['/home/estadosForm']);
  }

  editarEstado(id: number): void {
    this.router.navigate(['home/estadosForm', id]);
  }

  excluirEstado(id: number, nome: string): void {
    Swal.fire({
      title: 'Excluir estado?',
      html: `Tem certeza que deseja excluir <strong>${nome}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-trash"></i> Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.estadoService.excluir(id).subscribe(() => {
          Swal.fire('Excluído!', 'O estado foi removido com sucesso.', 'success');
          this.carregarEstados();
        });
      }
    });
  }
}
