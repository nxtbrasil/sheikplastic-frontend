import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PedidoItemService } from './pedido-item.service';


@Component({
  selector: 'app-pedido-itens-form',
  templateUrl: './pedido-itens-form.component.html'
})
export class PedidoItensFormComponent implements OnInit {

  form!: FormGroup;

  pedidoId!: number;
  pessoaId!: number;
  seqProduto?: number;

  pedido: any;
  itens: any[] = []

  salvando = false; 


  produtos: any[] = [];
  isEdit = false;

  totalPedido = 0;
  totalEntregue = 0;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private service: PedidoItemService
  ) { }

  ngOnInit(): void {
    this.pedidoId = Number(this.route.snapshot.paramMap.get('id'));
    this.pessoaId = Number(this.route.snapshot.paramMap.get('idPessoa'));
    this.seqProduto = Number(this.route.snapshot.paramMap.get('seqProduto'));

    this.isEdit = !!this.seqProduto;

    this.form = this.fb.group({
      seqProduto: [null, Validators.required],
      valorVenda: [0, Validators.required],
      qtdItem: [0, Validators.required],
      unpItem: ['', Validators.required],
      qtdEntregue: [0],
      unvItem: ['', Validators.required]
    });

    // 🔥 ÚNICA chamada necessária
    this.carregarItens();

    this.form.valueChanges.subscribe(() => this.calcularTotais());
  }


  carregarProdutos() {
    this.service.listarPorPedido(this.pessoaId).subscribe(res => {
      this.pedido = res.pedido;
      this.itens = res.itens;
    });
  }

  carregarItem() {
    this.service.buscarItem(
      this.pedidoId,
      this.pessoaId,
      this.seqProduto!
    ).subscribe(item => {
      this.form.patchValue(item);
      this.calcularTotais();
    });
  }

  carregarItens(): void {
  this.service.listarPorPedido(this.pessoaId).subscribe({
    next: res => {
      this.itens = res.itens;
      this.pedido = res.pedido;

      this.totalPedido = res.pedido.valorPedido;
      this.totalEntregue = res.pedido.valorEntregue;

      // 🔥 Agora produtos vêm de outro lugar
      this.carregarProdutosPessoa();

      // edição só depois dos combos
      if (this.isEdit) {
        this.carregarItem();
      }
    },
    error: () => {
      Swal.fire('Erro', 'Erro ao carregar itens do pedido', 'error');
    }
  });
}

carregarProdutosPessoa(): void {
  this.service.listarProdutosPessoa(this.pedidoId).subscribe({
    next: produtos => {
      this.produtos = produtos;
    },
    error: () => {
      Swal.fire('Erro', 'Erro ao carregar produtos da pessoa', 'error');
    }
  });
}



  calcularTotais() {
    const v = Number(this.form.value.valorVenda || 0);
    const qp = Number(this.form.value.qtdItem || 0);
    const qe = Number(this.form.value.qtdEntregue || 0);

    this.totalPedido = v * qp;
    this.totalEntregue = v * qe;
  }

  salvar() {
  if (this.form.invalid) {
    this.form.markAllAsTouched(); // Destaca os campos com erro para o usuário
    Swal.fire('Atenção', 'Preencha os campos obrigatórios corretamente', 'warning');
    return;
  }

  this.salvando = true; // Bloqueia interações extras

  const payload = {
    ...this.form.getRawValue(), // getRawValue inclui campos desabilitados (como IDs)
    idPedido: this.pedidoId,
    idPessoa: this.pessoaId
  };

  const acao = this.isEdit
    ? this.service.atualizar(this.pedidoId, this.pessoaId, this.seqProduto!, payload)
    : this.service.criar(this.pedidoId, this.pessoaId, payload);

  acao.subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Item salvo com sucesso',
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        this.router.navigate(['home/pedidosItem', this.pessoaId, this.pedidoId]);
      });
    },
    error: (err) => {
      this.salvando = false;
      console.error(err);
      Swal.fire('Erro', 'Produto já cadastrado no Pedido', 'error');
    }
  });
}

  voltar() {
    this.router.navigate(['home/pedidosItem', this.pessoaId, this.pedidoId]);
  }

  onProdutoSelecionado(): void {

  const seqProduto = this.form.get('seqProduto')?.value;

  if (!seqProduto) {
    return;
  }

  const produto = this.produtos.find(
    p => p.seqProduto === Number(seqProduto)
  );

  if (!produto) {
    return;
  }

  // 🔥 Preenche automaticamente (igual ASP)
  this.form.patchValue({
    valorVenda: produto.valorVenda,
    unpItem: produto.unpProduto,
    unvItem: produto.unvProduto
  });

  this.calcularTotais();
}
}
