import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoContato } from '../tipo-contato.model';
import { TipoContatoService } from '../tipo-contato.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tipo-contato-form',
  templateUrl: './tipo-contato-form.component.html',
    styleUrls: ['./tipo-contato-form.component.css']
})
export class TipoContatoFormComponent implements OnInit {

  tipo: TipoContato = { descricao: '' };
  id!: number | null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TipoContatoService
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.service.buscarPorId(this.id).subscribe(dados => {
        this.tipo = dados;
      });
    }
  }

    salvar(): void {
      if (this.id) {
       this.service.atualizar(this.tipo).subscribe(() => {
          Swal.fire('Sucesso', 'Tipo Contato atualizado com sucesso!', 'success');
          this.router.navigate(['/home/_cad/tiposContatoListar']);
        });
      } else {
        this.service.salvar(this.tipo).subscribe(() => {
          Swal.fire('Sucesso', 'Tipo Contato cadastrado com sucesso!', 'success');
          this.router.navigate(['/home/_cad/tiposContatoListar']);
        });
      }
    }

  cancelar(): void {
    this.router.navigate(['/home/_cad/tiposContatoListar']);
  }
}
