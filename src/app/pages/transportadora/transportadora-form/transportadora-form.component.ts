import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TransportadoraService } from "../transportadora.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CidadeService } from "../../cidades/cidade.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transportadora-form',
  templateUrl: './transportadora-form.component.html',
  styleUrls: ['./transportadora-form.component.css']
})
export class TransportadoraFormComponent implements OnInit {

  formTransportadora!: FormGroup;
  isEdit = false;
  id!: number;
  cidades: any[] = [];

  constructor(
    private fb: FormBuilder,
    private service: TransportadoraService,
    private route: ActivatedRoute,
    private router: Router,
    private cidadeService: CidadeService
  ) { }

  ngOnInit() {

    this.carregarCidades();


    this.formTransportadora = this.fb.group({
      idTransportadora: [null],
      nome: ['', [Validators.required]],
      // Validação de CNPJ: Obrigatório e exatamente 14 caracteres
      cnpj: ['', [Validators.required, Validators.minLength(14), Validators.maxLength(14), Validators.pattern('^[0-9]*$')]],
      telefone: [''],
      email: ['', [Validators.email]], // Adicionei validação de e-mail básico
      cepEnderecoPessoa: [''],
      logradouroEnderecoPessoa: [''],
      numeroEnderecoPessoa: [''],
      complementoEnderecoPessoa: [''],
      bairroEnderecoPessoa: [''],
      idCidade: [null, Validators.required],
      ativo: [true]
    });


    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.isEdit = true;
      this.service.buscarPorId(this.id)
        .subscribe(d => this.formTransportadora.patchValue(d));
    }
  }

  salvar() {
    if (this.formTransportadora.invalid) return;

    const dto = this.formTransportadora.value;


    if (this.isEdit) {
      this.service.atualizar(this.id, dto).subscribe(() => {
        Swal.fire('Sucesso', 'Transportadora atualizada com sucesso!', 'success');
        this.router.navigate(['/home/transportadoras']);
      });
    } else {
      this.service.salvar(dto).subscribe(() => {
        Swal.fire('Sucesso', 'Transportadora criada com sucesso!', 'success');
        this.router.navigate(['/home/transportadoras']);
      });
    }
  }


  cancelar() {
    this.router.navigate(['/home/transportadoras']);
  }

  carregarCidades() {
    this.cidadeService.listar().subscribe({
      next: (res) => this.cidades = res,
      error: () => alert('Erro ao carregar cidades')
    });
  }

  onSubmit() {
    if (this.formTransportadora.valid) {
      // 2. Montagem do Payload conforme sua necessidade
      const payload = {
        ...this.formTransportadora.value,
        cidade: {
          idCidade: this.formTransportadora.value.idCidade
        },
        idCidade: undefined
      };

      if (payload.id) {
        this.service.atualizar(payload.id, payload);
      } else {
        this.service.salvar(payload);
      }
    }
  }

}
