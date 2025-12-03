import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '_cad',
    children: [
      {
        path: 'cidades',
        loadChildren: () =>
          import('../cidades/cidades-routing.module').then(m => m.CidadesRoutingModule)
      },
      {
        path: 'estados',
        loadChildren: () =>
          import('../estados/estados.module').then(m => m.EstadosModule)
      },
      {
        path: 'funcoes',
        loadChildren: () =>
          import('../funcoes/funcoes.module').then(m => m.FuncoesModule)
      },
      {
        path: 'produtos',
        loadChildren: () =>
          import('../produtos/produtos.module').then(m => m.ProdutosModule)
      },
      {
        path: 'tipos-contato',
        loadChildren: () =>
          import('../tipo-contato/tipo-contato.module').then(m => m.TipoContatoModule)
      },
      {
        path: 'pessoas',
        loadChildren: () =>
          import('../pessoa/pessoa.module').then(m => m.PessoaModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CadastrosRoutingModule {}
