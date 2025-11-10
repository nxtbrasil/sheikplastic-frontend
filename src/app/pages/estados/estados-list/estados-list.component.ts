import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../estado.service';
import { Estado } from '../estado.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-estados-list',
  templateUrl: './estados-list.component.html'
})
export class EstadosListComponent implements OnInit {

  estados: Estado[] = [];

  constructor(private estadoService: EstadoService, private router: Router) { }

  ngOnInit(): void {
    this.carregarEstados();
  }

  carregarEstados(): void {
    this.estadoService.listar().subscribe(dados => this.estados = dados);
  }

  novoEstado(): void {
    this.router.navigate(['/estados/novo']);
  }

  editarEstado(id: number): void {
    this.router.navigate(['/estados/editar', id]);
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
