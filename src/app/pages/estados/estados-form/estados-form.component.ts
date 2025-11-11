import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../estado.service';
import { Estado } from '../estado.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estados-form',
  templateUrl: './estados-form.component.html',
    styleUrls: ['./estados-form.component.css']
})
export class EstadosFormComponent implements OnInit {

  estado: Estado = { idEstado: 0, siglaEstado: '', nomeEstado: '' };
  id?: number;

  constructor(
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id) {
      this.estadoService.buscarPorId(this.id).subscribe(data => this.estado = data);
    }
  }

  salvar(): void {
    if (this.id) {
      this.estadoService.atualizar(this.id, this.estado).subscribe(() => {
        Swal.fire('Sucesso', 'Estado atualizado com sucesso!', 'success');
        this.router.navigate(['/home/_cad/estadosListar']);
      });
    } else {
      this.estadoService.salvar(this.estado).subscribe(() => {
        Swal.fire('Sucesso', 'Estado cadastrado com sucesso!', 'success');
        this.router.navigate(['/home/_cad/estadosListar']);
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/home/_cad/estadosListar']);
  }
}
