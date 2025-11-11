import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncoesService } from '../funcoes.service';
import { Funcao } from '../funcoes.model';

@Component({
  selector: 'app-funcoes-form',
  templateUrl: './funcoes-form.component.html',
  styleUrls: ['./funcoes-form.component.css']
})
export class FuncoesFormComponent implements OnInit {
  funcao: Funcao = { nomeFuncao: '' };
  editando = false;

  constructor(
    private funcoesService: FuncoesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.editando = true;
      this.funcoesService.buscarPorId(id).subscribe(f => this.funcao = f);
    }
  }

  salvar(): void {
    if (this.editando && this.funcao.idFuncao) {
      this.funcoesService.atualizar(this.funcao.idFuncao, this.funcao)
        .subscribe(() => this.router.navigate(['/funcoes']));
    } else {
      this.funcoesService.criar(this.funcao)
        .subscribe(() => this.router.navigate(['/funcoes']));
    }
  }

  cancelar(): void {
    this.router.navigate(['/funcoes']);
  }
}
