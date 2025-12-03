import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PessoaService } from '../pessoa.service';
import Swal from 'sweetalert2';
import { TipoContatoService } from '../../tipo-contato/tipo-contato.service';
import { PessoaContatoService } from '../pessoa-contato.service';
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

  estados: any[] = [];
  cidades: any[] = [];
  condicoesPagamento: any[] = [];
  idPessoa!: number;

  contatos: any[] = [];

  carregandoEdicao = false;

  formContato!: FormGroup;
  contatoEditando: any = null;

  tiposContato: any[] = []; // Lista dinâmica

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pessoaService: PessoaService,
    private tipoContatoService: TipoContatoService,
    private pessoaContatoService: PessoaContatoService
  ) { }

  ngOnInit(): void {

    this.criarFormulario();

    this.pessoaId = Number(this.route.snapshot.paramMap.get('id'));
    this.isEdit = !!this.pessoaId;

    this.carregarCondicoesPagamento();
    this.carregarEstados();
    this.criarFormContato();
    this.carregarTiposContato();


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

  criarFormContato() {
    this.formContato = this.fb.group({
      seqContato: [0],
      idTipoContato: ['', Validators.required],
      contato: ['', Validators.required],
      observacao: ['']
    });
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
      idPessoa: [null],
      tipoPessoa: [''],

      documentoPessoa: ['', Validators.required],
      identidadePessoa: ['', Validators.required],

      nomePessoa: ['', Validators.required],
      apelidoPessoa: [''],

      cepPessoaString: [''],
      logradouroPessoa: [''],
      numeroPessoa: [''],
      complementoPessoa: [''],
      bairroPessoa: [''],

      estado: ['', Validators.required],
      cidade: ['', Validators.required],

      idCondicaoPagamento: ['', Validators.required],
      observacao: [''],
      status: ['']
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
        status: p.ativo
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
      observacao: f.observacao ?? ""
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
      idTipoContato: c.idTipoContato,
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

  salvarContato() {

    if (this.formContato.invalid) {
      this.formContato.markAllAsTouched();
      return;
    }

    const dados = this.formContato.value;

    // Monta objeto que a API espera
    const payload = {
      idPessoa: this.idPessoa,
      seqContato: this.contatoEditando?.seqContato ?? 0, // backend ignora no POST
      tipoContato: {
        id: dados.idTipoContato
      },
      contato: dados.contato,
      observacao: dados.observacao
    };

    // Se estiver editando → PUT
    if (this.contatoEditando) {

      this.pessoaContatoService
        .atualizar(this.idPessoa, this.contatoEditando.seqContato, payload)
        .subscribe({
          next: () => {
            Swal.fire('Sucesso', 'Contato atualizado!', 'success');
            this.carregarContatos();
            this.fecharModal();
          },
          error: () => Swal.fire('Erro', 'Falha ao atualizar contato!', 'error')
        });

    } else {
      // Novo contato → POST

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
}
