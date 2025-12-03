import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

interface MenuItem {
  id: number;
  descricao: string;
  endereco?: string;
  subMenus?: MenuItem[];
}

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

  menu: MenuItem[] = [];
  openedMenu: number | null = null;
  isCollapsed = false;

  constructor(
    private menuService: MenuService,
    public auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMenu();
  }

  private loadMenu(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        this.menu = this.removeAspRecursively(data);
      },
      error: (err) => console.error('Erro ao carregar menu:', err),
    });
  }

  private removeAspRecursively(items: MenuItem[]): MenuItem[] {
    return items.map(item => ({
      ...item,
      endereco: item.endereco ? item.endereco.replace(/\.asp$/i, '') : undefined,
      subMenus: item.subMenus ? this.removeAspRecursively(item.subMenus) : []
    }));
  }

  toggleMenu(id: number): void {
    this.openedMenu = this.openedMenu === id ? null : id;
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;

    if (this.isCollapsed) {
      this.openedMenu = null;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
