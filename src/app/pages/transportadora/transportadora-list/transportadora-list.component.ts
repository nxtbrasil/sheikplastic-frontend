import { Component, OnInit } from "@angular/core";
import { TransportadoraService } from "../transportadora.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-transportadora-list',
  templateUrl: './transportadora-list.component.html',
    styleUrls: ['./transportadora-list.component.css']
})
export class TransportadoraListComponent implements OnInit {

  transportadoras: any[] = [];

  constructor(
    private service: TransportadoraService,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregar();
  }

  carregar() {
    this.service.listar().subscribe(res => this.transportadoras = res);
  }

  nova() {
    this.router.navigate(['/home/transportadoraForm']);
  }

  editar(t: any) {
    this.router.navigate(['/home/transportadoraForm', t.idTransportadora]);
  }

  excluir(t: any) {
    if (!confirm('Confirma excluir a transportadora?')) return;

    this.service.deletar(t.idTransportadora).subscribe(() => this.carregar());
  }
}
