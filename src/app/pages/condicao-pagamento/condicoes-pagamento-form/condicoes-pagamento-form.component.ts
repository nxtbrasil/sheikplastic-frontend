import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CondicaoPagamento } from '../condicao-pagamento.model';
import { CondicaoPagamentoService } from '../condicao-pagamento.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-condicoes-pagamento-form',
  templateUrl: './condicoes-pagamento-form.component.html',
  styleUrls: ['./condicoes-pagamento-form.component.css']
})
export class CondicoesPagamentoFormComponent implements OnInit {
  condicao: CondicaoPagamento = { idCondicaoPagamento: 0, descricaoCondicaoPagamento: '' };

  constructor(
    private service: CondicaoPagamentoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.service.buscarPorId(+id).subscribe({
        next: (dados) => this.condicao = dados,
        error: () => Swal.fire('Erro', 'Falha ao carregar dados', 'error')
      });
    }
  }

  salvar(): void {
    const operacao = this.condicao.idCondicaoPagamento === 0
      ? this.service.salvar(this.condicao)
      : this.service.atualizar(this.condicao.idCondicaoPagamento, this.condicao);

    operacao.subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Registro salvo com sucesso!', 'success');
        this.router.navigate(['/condicoes-pagamento']);
      },
      error: () => Swal.fire('Erro', 'Falha ao salvar', 'error')
    });
  }

  cancelar(): void {
    this.router.navigate(['/condicoes-pagamento']);
  }
}
