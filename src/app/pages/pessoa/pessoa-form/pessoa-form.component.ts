import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import Swal from 'sweetalert2';
import { TipoContatoService } from '../../tipo-contato/tipo-contato.service';
import { PessoaContatoService } from '../pessoa-contato.service';
import { PessoaProduto } from '../pessoa-produto.model';
import { Produto } from '../../produtos/produto.model';
import { ProdutoService } from '../../produtos/produto.service';
import { TransportadoraService } from '../../transportadora/transportadora.service';
declare var bootstrap: any;

@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;
  pessoaId!: number;

  formProduto!: FormGroup;
  produtoEditando: any | null = null;
  transportadoras: any[] = [];

  listaPrecificacao: PessoaProduto[] = [];

  estados: any[] = [];
  cidades: any[] = [];
  condicoesPagamento: any[] = [];
  idPessoa!: number;

  contatos: any[] = [];

  produtos: any[] = [];
  produtosPaginados: any[] = [];

  produtosCatalogo: any[] = [];

  paginaAtual = 1;
  tamanhoPagina = 10;
  totalRegistros = 0;
  totalPaginas = 0;
  inicioRegistro = 0;
  fimRegistro = 0;

  historicoPrecos: any[] = [];
  historicoProdutoSelecionado: any = null;


  carregandoEdicao = false;

  formContato!: FormGroup;
  contatoEditando: any = null;

  tiposContato: any[] = []; // Lista dinâmica

  produtoPrecificacao: any = null;
  novoValor: number | null = null;




  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private tipoContatoService: TipoContatoService,
    private pessoaContatoService: PessoaContatoService,
    private produtoService: ProdutoService,
    private transportadoraService: TransportadoraService
  ) { }

  ngOnInit(): void {

    this.criarFormulario();

    this.pessoaId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.pessoaId;

    this.carregarCondicoesPagamento();
    this.carregarEstados();
    this.criarFormContato();
    this.carregarTiposContato();
    this.carregarProdutos();
    this.criarFormProduto();
    this.carregarTransportadoras();

    // Listener de estado
    this.form.get('estado')?.valueChanges.subscribe(idEstado => {
      if (this.carregandoEdicao) return;
      this.carregarCidadesPorEstado(idEstado, false);
    });

    if (this.isEdit) {
      this.carregarPessoa();
      this.carregarContatos();
    }

    this.onChangeTipoPessoa();
  }

  carregarProdutosPrecificacao() {
    if (!this.produtosCatalogo || this.produtosCatalogo.length === 0) {
      this.carregarCatalogoProdutos();
    }
  }

  criarFormContato() {
    this.formContato = this.fb.group({
      seqContato: [0],
      idTipoContato: ['', Validators.required],
      contato: ['', Validators.required],
      observacao: ['']
    });
  }


  carregarCatalogoProdutos(callback?: () => void) {
    this.produtoService.listarCombo().subscribe({
      next: (res) => {
        this.produtosCatalogo = res || [];
        callback?.(); // 🔥 avisa que terminou
      },
      error: () => {
        this.produtosCatalogo = [];
        callback?.();
      }
    });
  }


  carregarProdutos() {
    this.pessoaId = Number(this.route.snapshot.paramMap.get('id'));
    if (!this.pessoaId) return;

    this.pessoaService
      .listarProdutosPessoa(this.pessoaId)
      .subscribe({
        next: (res) => {
          this.produtos = res || [];
          this.totalRegistros = this.produtos.length;
          this.totalPaginas = Math.ceil(this.totalRegistros / this.tamanhoPagina);
          this.paginaAtual = 1;
          this.atualizarPaginacao();
        },
        error: (err) => console.error('Erro ao carregar produtos', err)
      });
  }

  atualizarPaginacao() {
    const inicio = (this.paginaAtual - 1) * this.tamanhoPagina;
    const fim = inicio + this.tamanhoPagina;

    this.produtosPaginados = this.produtos.slice(inicio, fim);

    this.inicioRegistro = inicio + 1;
    this.fimRegistro = Math.min(fim, this.totalRegistros);
  }

  paginaAnterior() {
    if (this.paginaAtual > 1) {
      this.paginaAtual--;
      this.atualizarPaginacao();
    }
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas) {
      this.paginaAtual++;
      this.atualizarPaginacao();
    }
  }

  editarProduto(produto: any) {

    this.pessoaId = Number(this.route.snapshot.paramMap.get('id'));

    // 1️⃣ Busca o produto da pessoa (API certa)
    this.pessoaService.buscarProdutoPessoa(
      this.pessoaId,
      produto.idProduto,
      produto.seqProduto
    ).subscribe(res => {

      this.produtoEditando = res;

      // 2️⃣ Carrega o catálogo DEPOIS
      this.carregarCatalogoProdutos(() => {

        // 3️⃣ Agora o select já tem options
        this.formProduto.patchValue({
          seqProduto: res.seqProduto,
          idProduto: res.idProduto,
          complementoProduto: res.complementoProduto,
          unpProduto: res.unpProduto,
          unvProduto: res.unvProduto,
          valorVenda: res.valorVenda
        });

        // 4️⃣ Abre modal
        const modal = new bootstrap.Modal(
          document.getElementById('modalProduto')!
        );
        modal.show();
      });

    });
  }


  historicoProduto(produto: any) {
    console.log('Histórico', produto);
  }

  excluirProduto(produto: any) {
    if (confirm(`Excluir o produto ${produto.nomeProduto}?`)) {
      console.log('Excluir', produto);
    }
  }



  listarContatosPorPessoa(idPessoa: number) {
    return this.pessoaService.listarContatosPorPessoa(idPessoa);
  }

  carregarContatos() {
    if (!this.pessoaId) return;

    this.pessoaService.listarContatosPorPessoa(this.pessoaId).subscribe({
      next: (res) => {
        console.log("Contatos carregados:", res);
        this.contatos = res;
      },
      error: () => {
        console.warn("Nenhum contato encontrado ou erro ao carregar.");
        this.contatos = [];
      }
    });
  }

  carregarTiposContato() {
    this.tipoContatoService.listar().subscribe({
      next: (dados) => {
        this.tiposContato = dados;
      },
      error: (err) => {
        console.error('Erro ao carregar tipos de contato', err);
      }
    });
  }

  criarFormulario() {

    this.form = this.fb.group({
      tipoPessoa: [''],
      documentoPessoa: [''],
      identidadePessoa: [''],
      nomePessoa: [''],
      apelidoPessoa: [''],
      cepPessoaString: [''],
      logradouroPessoa: [''],
      numeroPessoa: [''],
      complementoPessoa: [''],
      bairroPessoa: [''],
      estado: [''],
      cidade: [''],
      idCondicaoPagamento: [''],
      status: [true],
      observacao: [''],
      idTransportadora: ['']
    });


    this.form = this.fb.group({
      idPessoa: [null],
      tipoPessoa: [''],

      documentoPessoa: ['',],
      identidadePessoa: ['',],

      nomePessoa: ['',],
      apelidoPessoa: [''],

      cepPessoaString: [''],
      logradouroPessoa: [''],
      numeroPessoa: [''],
      complementoPessoa: [''],
      bairroPessoa: [''],

      estado: ['',],
      cidade: ['',],

      idCondicaoPagamento: ['',],
      observacao: [''],
      status: [''],
      idTransportadora: ['']
    });
  }

  // ======== VALIDADORES DINÂMICOS CPF/CNPJ ========
  onChangeTipoPessoa() {
    this.form.get('tipoPessoa')?.valueChanges.subscribe(tipo => {

      const doc = this.form.get('documentoPessoa');
      const ident = this.form.get('identidadePessoa');

      doc?.clearValidators();
      ident?.clearValidators();

      if (tipo === 'F') {
        console.log('Tipo FÍSICA selecionado');
        doc?.setValidators([
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11)
        ]);

      } else {
        console.log('Tipo JURÍDICA selecionado');
        doc?.setValidators([
          Validators.required,
          Validators.minLength(14),
          Validators.maxLength(14)
        ]);

      }

      doc?.updateValueAndValidity();
      ident?.updateValueAndValidity();
    });
  }

  carregarCondicoesPagamento() {
    this.pessoaService.listarCondicoesPagamento().subscribe(res => {
      this.condicoesPagamento = res;
    });
  }

  carregarEstados() {
    this.pessoaService.listarEstados().subscribe(res => {
      this.estados = res;
    });
  }

  carregarCidadesPorEstado(idEstado: number, manterCidade: boolean) {

    if (!idEstado) {
      this.cidades = [];
      this.form.get('cidade')?.setValue('');
      return;
    }

    this.pessoaService.listarCidadesPorEstado(idEstado).subscribe(res => {
      this.cidades = res;

      if (manterCidade) {
        const cidadeAtual = this.form.get('cidade')?.value;
        this.form.get('cidade')?.setValue(cidadeAtual);
      }
    });
  }

  // =========== EDITAR ===========
  carregarPessoa() {

    this.carregandoEdicao = true;

    this.pessoaService.buscarPorId(this.pessoaId).subscribe(p => {

      const idEstado = p.cidade?.idEstado ?? '';
      const idCidade = p.cidade?.idCidade ?? '';

      this.form.patchValue({
        idPessoa: p.id,
        tipoPessoa: p.tipoPessoa,
        documentoPessoa: p.documento,
        identidadePessoa: p.identidade,
        nomePessoa: p.nome,
        apelidoPessoa: p.apelido,
        cepPessoaString: p.cepPessoaString,
        logradouroPessoa: p.logradouroPessoa,
        numeroPessoa: p.numeroPessoa,
        complementoPessoa: p.complementoPessoa,
        bairroPessoa: p.bairroPessoa,
        estado: idEstado,
        cidade: idCidade,
        idCondicaoPagamento: p.idCondicaoPagamento,
        observacao: p.observacao,
        status: p.ativo,
        idTransportadora: p.idTransportadora ?? null
      });

      // Carrega cidades do estado e mantém a cidade
      this.carregarCidadesPorEstado(idEstado, true);

      setTimeout(() => {
        this.carregandoEdicao = false;
      }, 300);
    });
  }

  // =========== SALVAR ===========
  salvar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const f = this.form.value;

    const payload = {
      id: f.idPessoa || 0,
      tipoPessoa: f.tipoPessoa,
      documento: f.documentoPessoa,
      identidade: f.identidadePessoa,
      nome: f.nomePessoa,
      apelido: f.apelidoPessoa,
      cepPessoaString: f.cepPessoaString,
      logradouroPessoa: f.logradouroPessoa,
      numeroPessoa: f.numeroPessoa,
      complementoPessoa: f.complementoPessoa,
      bairroPessoa: f.bairroPessoa,
      idCidade: Number(f.cidade),
      idCondicaoPagamento: Number(f.idCondicaoPagamento),
      ativo: f.status ?? "1",
      observacao: f.observacao ?? "",
      idTransportadora: f.idTransportadora
    };

    if (this.isEdit) {
      this.pessoaService.editar(this.pessoaId, payload).subscribe(() => {
        Swal.fire('Sucesso', 'Pessoa atualizada com sucesso!', 'success');
        this.router.navigate(['/home/pessoas']);
      });
    } else {
      this.pessoaService.criar(payload).subscribe(() => {
        Swal.fire('Sucesso', 'Pessoa criada com sucesso!', 'success');
        this.router.navigate(['/home/pessoas']);
      });
    }
  }

  // =========== VIA CEP ===========
  buscarCep() {
    const cep = this.form.get('cepPessoaString')?.value;

    if (cep && cep.length >= 8) {
      this.pessoaService.buscarCep(cep).subscribe({
        next: (data: any) => {
          if (!data.erro) {

            this.form.patchValue({
              logradouroPessoa: data.logradouro,
              bairroPessoa: data.bairro
            });

          }
        }
      });
    }
  }
  cancelar() {
    this.router.navigate(['/home/pessoas']);
  }

  editarFuncao() {
    this.router.navigate([`/home/pessoa/${this.pessoaId}/funcoes`]);
  }

  editarContato(c: any) {
    this.contatoEditando = c;

    this.formContato.patchValue({
      seqContato: c.seqContato,
      idTipoContato: c.tipoContato.id, // <-- CORRETO!
      contato: c.contato,
      observacao: c.observacao
    });

    const modal = new bootstrap.Modal(document.getElementById('modalContato')!);
    modal.show();
  }

  novoContato() {
    const proximoSeq = (this.contatos.length > 0)
      ? Math.max(...this.contatos.map(c => c.seqContato)) + 1
      : 1;

    this.contatoEditando = null;

    this.formContato.reset({
      seqContato: proximoSeq,
      idTipoContato: '',
      contato: '',
      observacao: ''
    });

    const modal = new bootstrap.Modal(document.getElementById('modalContato')!);
    modal.show();
  }

  deletarContato(c: any) {

    const dados = this.formContato.value;

    Swal.fire({
      title: 'Confirmação',
      text: 'Deseja realmente deletar este contato?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, deletar',
      cancelButtonText: 'Cancelar'

    }).then((result) => {
      if (result.isConfirmed) {
        this.pessoaContatoService
          .remover(this.pessoaId, c.seqContato)
          .subscribe({

            next: () => {
              Swal.fire('Sucesso', 'Contato deletado!', 'success');
              this.carregarContatos();
            },
            error: () => Swal.fire('Erro', 'Falha ao deletar contato!', 'error')
          });
      }
    });
  }

  salvarContato() {

    if (this.formContato.invalid) {
      this.formContato.markAllAsTouched();
      return;
    }

    const dados = this.formContato.value;

    const payload = {
      idPessoa: this.pessoaId,
      idTipoContato: dados.idTipoContato,
      contato: dados.contato,
      observacao: dados.observacao
    };

    if (this.contatoEditando) {

      this.pessoaContatoService
        .atualizar(this.pessoaId, this.contatoEditando.seqContato, payload)
        .subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Contato atualizado!', 'success');
            this.carregarContatos();
            this.fecharModal();
          },
          error: () => Swal.fire('Erro', 'Falha ao atualizar contato!', 'error')
        });

    } else {

      this.pessoaContatoService
        .criar(payload)
        .subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Contato adicionado!', 'success');
            this.carregarContatos();
            this.fecharModal();
          },
          error: () => Swal.fire('Erro', 'Falha ao adicionar contato!', 'error')
        });
    }
  }




  fecharModal() {
    const modalElement = document.getElementById('modalContato');
    const modal = bootstrap.Modal.getInstance(modalElement!);
    modal?.hide();
  }

  verHistorico(produto: any) {
    this.historicoProdutoSelecionado = produto;
    this.historicoPrecos = [];

    this.pessoaService
      .buscarHistoricoPreco(this.form.get('idPessoa')?.value, produto.seqProduto)
      .subscribe({
        next: (dados) => {
          this.historicoPrecos = dados || [];
          this.abrirModalHistorico();
        },
        error: () => {
          this.historicoPrecos = [];
          this.abrirModalHistorico();
        }
      });
  }

  abrirModalHistorico() {
    const modalEl = document.getElementById('modalHistoricoProduto');
    if (modalEl) {
      const modal = new (window as any).bootstrap.Modal(modalEl);
      modal.show();
    }
  }



  private criarFormProduto() {
    this.formProduto = this.fb.group({
      seqProduto: [{ value: null, disabled: true }],
      idProduto: [null, Validators.required], // objeto Produto
      complementoProduto: [''],
      unpProduto: [''],
      unvProduto: [''],
      valorVenda: [null, Validators.required]
    });
  }

  compareProduto = (p1: any, p2: any): boolean => {
    return p1 && p2 ? p1.idProduto === p2.idProduto : p1 === p2;
  };

  novoProduto() {
    this.carregarCatalogoProdutos();
    this.formProduto.reset({
      seqProduto: 0
    });

    const modal = new bootstrap.Modal(
      document.getElementById('modalProduto')!
    );
    modal.show();
  }


  salvarProduto() {
    if (this.formProduto.invalid) {
      this.formProduto.markAllAsTouched();
      return;
    }
    this.pessoaId = Number(this.route.snapshot.paramMap.get('id'));

    const f = this.formProduto.getRawValue();

    const payload = {
      idPessoa: this.pessoaId,
      seqProduto: f.seqProduto ?? 0,
      idProduto: f.idProduto,
      complementoProduto: f.complementoProduto,
      unpProduto: f.unpProduto,
      unvProduto: f.unvProduto,
      valorVenda: f.valorVenda,
      valorVendaAnterior: f.valorVenda
    };

    this.pessoaService
      .salvarProdutoPessoa(this.pessoaId, payload)
      .subscribe({
        next: () => {
          this.carregarProdutos();
          this.produtoEditando = null;

          bootstrap.Modal.getInstance(
            document.getElementById('modalProduto')!
          )?.hide();
        },
        error: (err) => {
          console.error(err);
          alert('Erro ao salvar produto');
        }
      });
  }

  deletarProduto(produto: any) {

    Swal.fire({
      title: 'Confirmação',
      text: `Deseja excluir o produto ${produto.nomeProduto}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then(result => {

      if (result.isConfirmed) {
        this.pessoaService
          .deletarProduto(this.pessoaId, produto.seqProduto)
          .subscribe({
            next: () => {
              Swal.fire('Sucesso', 'Produto excluído!', 'success');
              this.carregarProdutos();
            },
            error: () => {
              Swal.fire('Erro', 'Falha ao excluir produto', 'error');
            }
          });
      }
    });
  }

  salvarPrecificacao(): void {
    // 1. Definição segura das constantes
    const id = this.pessoaId || this.idPessoa;
    const idProd = this.produtoPrecificacao?.idProduto;
    const novoPreco = this.novoValor;

    // 2. Validações
    if (!id) {
      console.error('Erro: ID da Pessoa não encontrado.');
      Swal.fire('Erro', 'ID da pessoa não encontrado.', 'error');
      return;
    }

    if (!idProd || !novoPreco) {
      console.warn('Dados de produto ou valor ausentes.');
      Swal.fire('Atenção', 'Selecione um produto e informe o novo valor.', 'warning');
      return;
    }

    // 3. CONFIRMAÇÃO
    Swal.fire({
      title: 'Confirmar atualização',
      text: `Deseja atualizar o preço para ${novoPreco.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim, atualizar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#0d6efd',
      cancelButtonColor: '#6c757d',
    }).then(result => {

      if (!result.isConfirmed) {
        return;
      }

      // 4. CHAMADA AO SERVIÇO
      this.pessoaService
        .atualizarValorProduto(id, idProd, novoPreco)
        .subscribe({
          next: () => {

            // 🔄 Atualiza tela
            this.limparPrecificacao();
            this.carregarProdutos();
            this.onProdutoPrecificacaoChange();

            console.log(`Sucesso: Produto ${idProd} atualizado para ${novoPreco}`);

            // ✅ SUCESSO
            Swal.fire({
              icon: 'success',
              title: 'Preço atualizado!',
              timer: 2000,
              showConfirmButton: false,
            });
          },
          error: (err) => {
            console.error('Falha na API:', err);

            Swal.fire(
              'Erro',
              'Não foi possível atualizar o preço.',
              'error'
            );
          }
        });
    });
  }
  limparPrecificacao() {
    this.produtoPrecificacao = null;
    this.novoValor = null;
  }

  onProdutoPrecificacaoChange() {

    this.pessoaId = Number(this.route.snapshot.paramMap.get('id'));

    if (!this.produtoPrecificacao) {
      this.listaPrecificacao = [];
      return;
    }

    this.pessoaService
      .listarProdutosPorPessoaEProduto(
        this.pessoaId,
        this.produtoPrecificacao.idProduto
      )
      .subscribe(res => {
        this.listaPrecificacao = res;
      });
  }


  onProdutoChange(event: any) {

    const idProduto = this.formProduto.get('idProduto')?.value;
    const idPessoa = this.pessoaId;

    if (!idProduto) {
      return;
    }

    // 🔍 Verifica se já existe na lista da pessoa
    const produtoPessoa = this.produtos.find(
      p => p.idProduto === idProduto
    );

    // ➕ PRODUTO NOVO (não existe para a pessoa)
    if (!produtoPessoa) {

      this.formProduto.patchValue({
        seqProduto: 0
      });

      // 🔥 fallback: busca no catálogo de produtos
      this.produtoService.buscarPorId(idProduto).subscribe(produto => {
        this.formProduto.patchValue({
          complementoProduto: '',
          unpProduto: produto.unidadeProduto ?? '',
          unvProduto: produto.unidadeProduto ?? '',
          valorVenda: produto.valorVenda ?? null
        });
      });

      return;
    }

    // ✏️ PRODUTO JÁ EXISTENTE PARA A PESSOA
    const seqProduto = produtoPessoa.seqProduto;

    this.formProduto.patchValue({
      seqProduto
    });

    this.pessoaService
      .buscarProdutoPessoa(idPessoa, idProduto, seqProduto)
      .subscribe({
        next: (res) => {
          this.formProduto.patchValue({
            complementoProduto: res.complementoProduto,
            unpProduto: res.unpProduto,
            unvProduto: res.unvProduto,
            valorVenda: res.valorVenda
          });
        },
        error: () => {
          // 🛟 fallback de segurança (caso raro)
          this.produtoService.buscarPorId(idProduto).subscribe(produto => {
            this.formProduto.patchValue({
              complementoProduto: '',
              unpProduto: produto.unidadeProduto ?? '',
              unvProduto: produto.unidadeProduto ?? '',
              valorVenda: produto.valorVenda ?? null
            });
          });
        }
      });
  }

  carregarTransportadoras() {
    this.transportadoraService.listar().subscribe({
      next: (res: any[]) => this.transportadoras = res,
      error: () => console.error("Erro ao buscar transportadoras")
    });

  }

  // Adicione este Getter para filtrar os produtos
  get produtosFiltradosParaSelecao() {
    if (!this.produtosCatalogo) return [];

    // Pega todos os IDs que já estão na lista de produtos da pessoa
    const idsJaCadastrados = this.produtos.map(p => p.idProduto);

    // Se estivermos editando um produto existente, precisamos permitir que 
    // o ID desse produto específico apareça na lista para não sumir do select
    const idSendoEditado = this.formProduto.get('idProduto')?.value;

    return this.produtosCatalogo.filter(p =>
      !idsJaCadastrados.includes(p.idProduto) || p.idProduto === idSendoEditado
    );
  }

}
