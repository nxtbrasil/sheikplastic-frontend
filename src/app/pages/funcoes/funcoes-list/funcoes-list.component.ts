import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuncoesService } from '../funcoes.service';
import { Funcao } from '../funcoes.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcoes-list',
  templateUrl: './funcoes-list.component.html',
  styleUrls: ['./funcoes-list.component.css']
})
export class FuncoesListComponent implements OnInit {
  funcoes: Funcao[] = [];

  constructor(private funcoesService: FuncoesService, private router: Router) {}

  ngOnInit(): void {
    this.carregarFuncoes();
  }

  carregarFuncoes(): void {
    this.funcoesService.listar().subscribe(data => {
      this.funcoes = data;
    });
  }

  novaFuncao(): void {
    this.router.navigate(['/home/funcoesForm']);
  }

  editarFuncao(id: number): void {
    this.router.navigate(['/home/funcoesForm', id]);
  }

  excluirFuncao(funcao: Funcao): void {
    Swal.fire({
      title: 'Excluir Função?',
      html: `Tem certeza que deseja excluir <strong>${funcao.nomeFuncao}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-trash"></i> Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        this.funcoesService.excluir(funcao.idFuncao!).subscribe(() => {
          Swal.fire('Excluído!', 'A função foi removida.', 'success');
          this.carregarFuncoes();
        });
      }
    });
  }
}
