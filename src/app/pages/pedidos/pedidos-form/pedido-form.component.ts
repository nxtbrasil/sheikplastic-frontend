import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PedidoService } from '../pedido.service';
import { PessoaService } from '../../pessoa/pessoa.service';
import { CondicaoPagamentoService } from '../../condicao-pagamento/condicao-pagamento.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/auth.service'; // ajuste o caminho se precisar



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
    private route: ActivatedRoute,
    private auth: AuthService,
  ) { }

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

    const usuarioLogado = localStorage.getItem('userName');

    console.log('Usuário logado:', usuarioLogado);

    if (usuarioLogado) {

      const usuarioLogado = localStorage.getItem('userName');

      // 👇 SÓ PARA NOVO PEDIDO
      const id = this.route.snapshot.paramMap.get('id');
      if (!id) {
        this.form.patchValue({
          idFuncionario: usuarioLogado
        });
      }
    }


    const id = this.route.snapshot.paramMap.get('id');
    // 👇 NOVO PEDIDO → HOJE + 7 DIAS ÚTEIS
    if (!id) {
      const hoje = new Date();
      const previsao = this.adicionarDiasUteis(hoje, 7);

      const dataFormatada = previsao.toISOString().substring(0, 10);

      this.form.patchValue({
        dtPrevisaoPedido: dataFormatada
      });
    }

    // 👇 EDIÇÃO
    if (id) {
      this.isEdit = true;
      this.service.buscarPorId(+id).subscribe(p => {
        this.form.patchValue(p);
      });
    }


    // 1. Escuta quando o cliente mudar
    this.form.get('idPessoa')?.valueChanges.subscribe(id => {
      if (id) {
        this.buscarCondicaoPadraoCliente(id);
      }
    });


  }

  carregarCombos() {
    this.carregarClientes();
    this.carregarCondicoesPagamento();

    this.service.listarFuncionarios().subscribe(r => {
      this.funcionarios = r;

      // 👇 NOVO PEDIDO
      if (!this.isEdit) {
        const idFuncionario = Number(this.auth.getIdFuncionario());

        if (idFuncionario) {
          this.form.patchValue({
            idFuncionario: idFuncionario
          });
        }
      }
    });
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

  private adicionarDiasUteis(data: Date, dias: number): Date {
    const resultado = new Date(data);
    let adicionados = 0;

    while (adicionados < dias) {
      resultado.setDate(resultado.getDate() + 1);

      const diaSemana = resultado.getDay();
      // 0 = Domingo | 6 = Sábado
      if (diaSemana !== 0 && diaSemana !== 6) {
        adicionados++;
      }
    }

    return resultado;
  }

  buscarCondicaoPadraoCliente(idPessoa: number) {
  this.servicePessoa.buscarPorId(idPessoa).subscribe({
    next: (pessoa) => {
      // Se a pessoa tiver uma condição de pagamento vinculada
      if (pessoa && pessoa.idCondicaoPagamento) {
        
        // Faz o patch no formulário para selecionar automaticamente no select
        this.form.patchValue({
          idCondicaoPagamento: pessoa.idCondicaoPagamento
        });

        // Opcional: Se precisar de mais dados da API de condições, você pode chamar aqui:
        // this.condicaoPagamento.buscarPorId(pessoa.idCondicaoPagamento).subscribe(...)
      }
    },
    error: (err) => console.error('Erro ao buscar dados do cliente', err)
  });
}


}