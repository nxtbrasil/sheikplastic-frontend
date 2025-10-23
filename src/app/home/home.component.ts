import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('expandCollapse', [
      state('void', style({ height: '0', opacity: 0, overflow: 'hidden' })),
      state('*', style({ height: '*', opacity: 1, overflow: 'hidden' })),
      transition('void <=> *', animate('200ms ease-in-out')),
    ])
  ]
})
export class HomeComponent implements OnInit {
  menu: any[] = [];
  openedMenu: number | null = null;

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: data => this.menu = data,
      error: err => console.error(err)
    });
  }

  toggleMenu(id: number): void {
    this.openedMenu = this.openedMenu === id ? null : id;
  }
}
