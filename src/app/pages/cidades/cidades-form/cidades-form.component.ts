import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CidadeService } from '../cidade.service';
import { EstadoService } from '../../estados/estado.service';
import { Cidade } from '../cidade.model';
import { Estado } from '../../estados/estado.model';

@Component({
  selector: 'app-cidades-form',
  templateUrl: './cidades-form.component.html',
  styleUrls: ['./cidades-form.component.css']
})
export class CidadesFormComponent implements OnInit {
  cidade: Cidade = { nomeCidade: '', estado: { idEstado: 0, nomeEstado: '', siglaEstado: '' } };
  estados: Estado[] = [];
  editando = false;

  constructor(
    private cidadeService: CidadeService,
    private estadoService: EstadoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarEstados();

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.cidadeService.buscarPorId(id).subscribe(c => this.cidade = c);
    }
  }

  carregarEstados(): void {
    this.estadoService.listar().subscribe(estados => this.estados = estados);
  }

  compararEstados(e1: Estado, e2: Estado): boolean {
    return e1 && e2 ? e1.idEstado === e2.idEstado : e1 === e2;
  }

  salvar(): void {
    if (this.editando && this.cidade.idCidade) {
      this.cidadeService.atualizar(this.cidade.idCidade, this.cidade)
        .subscribe(() => this.router.navigate(['/home/_cad/cidadesListar']));
    } else {
      this.cidadeService.criar(this.cidade)
        .subscribe(() => this.router.navigate(['/home/_cad/cidadesListar']));
    }
  }

  cancelar(): void {
    this.router.navigate(['/home/_cad/cidadesListar']);
  }
}
