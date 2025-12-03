import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../produto.service';
import { Produto } from '../produto.model';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css']
})
export class ProdutosFormComponent implements OnInit {

  produto: Produto = {
    idProduto: 0,
    nomeProduto: '',
    valorCompra: 0,
    valorVenda: 0,
    unidadeProduto: ''
  };

  id?: number;

  constructor(
    private service: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
  this.id = Number(this.route.snapshot.params['id']);

  if (this.id) {
    this.service.buscarPorId(this.id).subscribe({
      next: (p) => {
        this.produto = p;
        // Diretiva automaticamente formata quando o writeValue é chamado
      },
      error: (err) => console.error('Erro ao buscar produto', err)
    });
  }
}


  salvar(): void {
    const obs = this.id
      ? this.service.atualizar(this.produto)
      : this.service.salvar(this.produto);

    obs.subscribe({
      next: () => this.router.navigate(['/home/produtos']),
      error: (err) => console.error('Erro ao salvar produto', err)
    });
  }

  formatarValor(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);
}

}
