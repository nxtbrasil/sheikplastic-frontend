import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submenu',
  template: `
    <ul class="submenu">
      <li *ngFor="let item of nodes">
        <a [routerLink]="[item.endereco]" class="submenu-link">{{ item.descricao }}</a>
      </li>
    </ul>
  `,
  styleUrls: ['./submenu.component.css']
})
export class SubmenuComponent {
  @Input() nodes: any[] = [];
}
