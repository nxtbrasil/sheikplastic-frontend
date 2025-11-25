import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
let PessoaFormComponent = class PessoaFormComponent {
    constructor(fb, route, router, pessoaService) {
        this.fb = fb;
        this.route = route;
        this.router = router;
        this.pessoaService = pessoaService;
        this.isEdit = false;
        this.estados = [];
        this.cidades = [];
        this.condicoesPagamento = [];
    }
    ngOnInit() {
        this.criarFormulario();
        this.pessoaId = Number(this.route.snapshot.paramMap.get('id'));
        if (this.pessoaId) {
            this.isEdit = true;
            this.carregarPessoa();
        }
        // APIs
        this.carregarCondicoesPagamento();
        this.carregarEstados();
        this.carregarCidades();
        // Regras de tipo de pessoa
        this.onChangeTipoPessoa();
    }
    criarFormulario() {
        this.form = this.fb.group({
            idPessoa: [null],
            tipoPessoa: ['F', Validators.required], // F ou J
            documento: [''], // CPF ou CNPJ (mesmo campo)
            identidadePessoa: [''], // RG ou Inscrição Estadual (mesmo campo)
            nomePessoa: ['', Validators.required],
            apelidoPessoa: [''],
            cepPessoaString: [''],
            logradouroPessoa: [''],
            numeroPessoa: [''],
            complementoPessoa: [''],
            bairroPessoa: [''],
            estado: [''],
            cidade: [''],
            idCondicaoPagamento: [''],
            observacao: [''],
            status: ['A']
        });
    }
    // -------------------------------------------------------------------
    // Regras dinâmicas
    // -------------------------------------------------------------------
    onChangeTipoPessoa() {
        this.form.get('tipoPessoa')?.valueChanges.subscribe(tipo => {
            const doc = this.form.get('documento');
            const ident = this.form.get('identidadePessoa');
            doc?.clearValidators();
            ident?.clearValidators();
            if (tipo === 'F') {
                // CPF + RG
                doc?.setValidators([Validators.required, Validators.minLength(11), Validators.maxLength(11)]);
                ident?.setValidators([Validators.required]);
            }
            else {
                // CNPJ + Inscrição Estadual
                doc?.setValidators([Validators.required, Validators.minLength(14), Validators.maxLength(14)]);
                ident?.setValidators([Validators.required]);
            }
            doc?.updateValueAndValidity();
            ident?.updateValueAndValidity();
        });
    }
    // -------------------------------------------------------------------
    // APIs
    // -------------------------------------------------------------------
    carregarCondicoesPagamento() {
        this.pessoaService.listarCondicoesPagamento().subscribe(res => {
            this.condicoesPagamento = res;
        });
    }
    carregarEstados() {
        // Caso tenha API, troco aqui. Exemplo fixo:
        this.estados = [
            { sigla: 'PR', nome: 'Paraná' },
            { sigla: 'SC', nome: 'Santa Catarina' },
            { sigla: 'RS', nome: 'Rio Grande do Sul' },
            { sigla: 'SP', nome: 'São Paulo' },
            { sigla: 'MG', nome: 'Minas Gerais' }
        ];
    }
    carregarCidades() {
        this.pessoaService.listarCidades().subscribe(res => {
            this.cidades = res;
        });
    }
    // -------------------------------------------------------------------
    // Carregar dados ao editar
    // -------------------------------------------------------------------
    carregarPessoa() {
        this.pessoaService.buscarPorId(this.pessoaId).subscribe(p => {
            this.form.patchValue({
                idPessoa: p.id,
                tipoPessoa: p.tipoPessoa,
                // Dados de documentos
                documentoPessoa: p.documento,
                identidadePessoa: p.identidade,
                // Dados pessoais
                nomePessoa: p.nome,
                apelidoPessoa: p.apelido,
                // Endereço
                cepPessoaString: p.cepPessoaString,
                logradouroPessoa: p.logradouroPessoa,
                numeroPessoa: p.numeroPessoa,
                complementoPessoa: p.complementoPessoa,
                bairroPessoa: p.bairroPessoa,
                // Estado e cidade (vem dentro do objeto cidade)
                estado: p.estadoPessoa, // você pode substituir pela sigla se necessário
                cidade: p.cidadePessoa,
                // Condição de pagamento
                idCondicaoPagamento: p.idCondicaoPagamento,
                // Observação e status
                observacao: p.observacao,
                status: p.status
            });
        });
    }
    // -------------------------------------------------------------------
    // Salvar
    // -------------------------------------------------------------------
    salvar() {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }
        const f = this.form.value;
        console.log("FORM VALUE:", f);
        // -----------------------------------------
        // MONTA O PAYLOAD EXATO QUE O BACKEND ESPERA
        // -----------------------------------------
        const payload = {
            id: f.id || 0,
            tipoPessoa: f.tipoPessoa,
            documento: f.documento,
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
            ativo: f.ativo ?? "1",
            observacao: f.observacao ?? ""
        };
        console.log("PAYLOAD ENVIADO:", payload);
        // -----------------------------------------
        // SALVAR OU EDITAR
        // -----------------------------------------
        if (this.isEdit) {
            this.pessoaService.editar(this.pessoaId, payload).subscribe(() => {
                this.router.navigate(['/pessoa']);
            });
        }
        else {
            this.pessoaService.criar(payload).subscribe(() => {
                this.router.navigate(['/pessoa']);
            });
        }
    }
    buscarCep() {
        const cep = this.form.get('cepPessoaString')?.value;
        if (cep && cep.length >= 8) {
            this.pessoaService.buscarCep(cep).subscribe({
                next: (data) => {
                    if (!data.erro) {
                        this.form.patchValue({
                            logradouroPessoa: data.logradouro,
                            bairroPessoa: data.bairro,
                            idCidade: data.uf,
                            estado: data.estado
                        });
                    }
                }
            });
        }
    }
};
PessoaFormComponent = __decorate([
    Component({
        selector: 'app-pessoa-form',
        templateUrl: './pessoa-form.component.html',
        styleUrls: ['./pessoa-form.component.css']
    })
], PessoaFormComponent);
export { PessoaFormComponent };
//# sourceMappingURL=pessoa-form.component.js.map