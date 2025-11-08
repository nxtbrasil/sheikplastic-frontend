import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CidadeService } from '../cidade.service';
import { Cidade } from '../cidade.model';

@Component({
  selector: 'app-cidades-form',
  templateUrl: './cidades-form.component.html',
  styleUrls: ['./cidades-form.component.css']
})
export class CidadesFormComponent implements OnInit {
  cidade: Cidade = { nomeCidade: '', idEstado: 0 };
  editando = false;

  constructor(
    private cidadeService: CidadeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.cidadeService.buscarPorId(id).subscribe(c => this.cidade = c);
    }
  }

  salvar(): void {
    if (this.editando && this.cidade.idCidade) {
      this.cidadeService.atualizar(this.cidade.idCidade, this.cidade).subscribe(() => this.router.navigate(['/cidades']));
    } else {
      this.cidadeService.criar(this.cidade).subscribe(() => this.router.navigate(['/cidades']));
    }
  }

  cancelar(): void {
    this.router.navigate(['/home/_cad/cidadesListar']);
  }
}
