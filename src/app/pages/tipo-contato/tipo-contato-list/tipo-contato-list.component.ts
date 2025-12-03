import { Component, OnInit } from '@angular/core';
import { TipoContatoService } from '../tipo-contato.service';
import { TipoContato } from '../tipo-contato.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tipo-contato-list',
  templateUrl: './tipo-contato-list.component.html',
  styleUrls: ['./tipo-contato-list.component.css']
})
export class TipoContatoListComponent implements OnInit {

  tipos: TipoContato[] = [];
  filtro = '';

  constructor(
    private service: TipoContatoService,
  private router: Router,
  private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    if (this.filtro.trim() !== '') {
      this.service.buscarPorDescricao(this.filtro)
        .subscribe(dados => this.tipos = dados);
    } else {
      this.service.listar().subscribe(dados => this.tipos = dados);
    }
  }

  novo() {
    this.router.navigate(['/home/tiposcontatoForm']);
  }

  editar(id: number) {
    this.router.navigate(['/home/tiposcontatoForm', id]);
  }


    excluir(tipo: TipoContato): void {
    Swal.fire({
      title: 'Excluir cidade?',
      html: `Tem certeza que deseja excluir <strong>${tipo.descricao}</strong>?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '<i class="fa-solid fa-trash"></i> Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Excluindo...',
          html: 'Por favor, aguarde enquanto a cidade é removida.',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
  
        this.http.delete(`${environment.apiBaseUrl}/tipos-contato/${tipo.id}`).subscribe({
          next: () => {
            this.listar();
            Swal.fire({
              title: 'Excluída!',
              text: `A cidade ${tipo.descricao} foi removida com sucesso.`,
              icon: 'success',
              confirmButtonColor: '#198754',
              timer: 1800,
              showConfirmButton: false
            });
          },
          error: (err) => {
            console.error('Erro ao excluir cidade:', err);
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível excluir a cidade.',
              icon: 'error',
              confirmButtonColor: '#dc3545'
            });
          }
        });
      }
    });

  }
}
