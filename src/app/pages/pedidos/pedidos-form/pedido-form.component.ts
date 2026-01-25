import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../pedido.service';
import { PessoaService } from '../../pessoa/pessoa.service';
import { CondicaoPagamentoService } from '../../condicao-pagamento/condicao-pagamento.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;

  pessoas: any[] = [];
  funcionarios: any[] = [];
  condicoesPagamento: any[] = [];
    clientes: any[] = []; 

      

  constructor(
    private fb: FormBuilder,
    private service: PedidoService,
    private servicePessoa: PessoaService,
    private condicaoPagamento: CondicaoPagamentoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.form = this.fb.group({
      idPedido: [],
      idPessoa: [null, Validators.required],
      idFuncionario: [null, Validators.required],
      idCondicaoPagamento: [null, Validators.required],
      dtPrevisaoPedido: [null, Validators.required],
        dtEntradaPedido: [{ value: null, disabled: true }], // 👈 somente leitura
      nomeSolicitante: [''],
      urgente: [false],
      observacao: [''],
      entregue: [false],
      ativo: [true]
    });

    this.carregarCombos();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.buscarPorId(+id).subscribe(p => this.form.patchValue(p));
    }
  }

  carregarCombos() {
    this.carregarClientes()
    this.service.listarFuncionarios().subscribe(r => this.funcionarios = r);
    this.carregarCondicoesPagamento();
  }

  carregarCondicoesPagamento() {
    this.condicaoPagamento.listar().subscribe({
      next: (data) => { 
        this.condicoesPagamento = data.sort((a, b) => {
          return a.descricaoCondicaoPagamento.localeCompare(b.descricaoCondicaoPagamento);
        }
        );
      },
      error: (err) => console.error('Erro ao carregar condições de pagamento', err)
    });
  } 

  carregarClientes() {
  this.servicePessoa.listar().subscribe({
    next: (data) => {
      this.clientes = data.sort((a, b) => {
        return a.nome.localeCompare(b.nome);
      });
    },
    error: (err) => console.error('Erro ao carregar clientes', err)
  });
}

salvar() {

  if (this.form.invalid) {
    Swal.fire({
      icon: 'warning',
      title: 'Atenção',
      text: 'Preencha os campos obrigatórios.',
      confirmButtonText: 'Ok'
    });
    return;
  }

  const isEdicao = !!this.form.value.idPedido;

  Swal.fire({
    title: isEdicao ? 'Atualizando pedido...' : 'Salvando pedido...',
    text: 'Aguarde um momento',
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading()
  });

  const request$ = isEdicao
    ? this.service.atualizar(this.form.value)
    : this.service.criar(this.form.value);

  request$.subscribe({
    next: () => {
      Swal.fire({
        icon: 'success',
        title: isEdicao
          ? 'Pedido atualizado com sucesso!'
          : 'Pedido salvo com sucesso!',
        confirmButtonText: 'Ok'
      }).then(() => {
        this.router.navigate(['home/pedidos']);
      });
    },
    error: (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Erro ao salvar',
        text: err?.error?.message || 'Não foi possível salvar o pedido.',
        confirmButtonText: 'Fechar'
      });
    }
  });
}


  cancelar() {
    this.router.navigate(['home/pedidos']);
  }
}