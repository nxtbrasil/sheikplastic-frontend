import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { MenuService } from '../../home/menu.service';

interface MenuItem {
  id: number;
  descricao: string;
  endereco?: string | null;
  subMenus?: MenuItem[];
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userName = '';
  dropdownOpen = false;
  menu: MenuItem[] = [];
  openedMenu: number | null = null;

  constructor(
    public auth: AuthService,
    private router: Router,
    private menuService: MenuService
  ) {
    this.userName = localStorage.getItem('userName') || '';
  }

  ngOnInit(): void {
    this.loadMenu();
  }

  private loadMenu(): void {
    this.menuService.getMenu().subscribe({
      next: (data) => {
        // 1) remove .asp
        const semAsp = this.removeAsp(data || []);

        // 2) converte para rotas Angular
        this.menu = this.formatMenuRoutes(semAsp);
      },
      error: (err) => console.error('Erro ao carregar menu:', err),
    });
  }

  /** 1) Remove .asp recursivamente */
  private removeAsp(items: MenuItem[]): MenuItem[] {
    return items.map(item => ({
      ...item,
      endereco: item.endereco ? item.endereco.replace(/\.asp$/i, '') : null,
      subMenus: item.subMenus ? this.removeAsp(item.subMenus) : []
    }));
  }

  /** 2) Converte rotas do backend em rotas Angular */
  private formatMenuRoutes(items: MenuItem[]): MenuItem[] {
    return items.map(item => ({
      ...item,
      endereco: this.formatRoute(item.endereco),
      subMenus: item.subMenus ? this.formatMenuRoutes(item.subMenus) : []
    }));
  }

  /** Converte _cad/cidadesListar → /home/cidades */
  private formatRoute(url: string | null): string | null {
    if (!url) return null;

    let clean = url.trim().toLowerCase();

    clean = clean.replace(/(listar|form|editar|incluir)$/g, "");

    const parts = clean.split('/');

    const funcionalidadeRaw = parts[1] || parts[0];
    const funcionalidade = funcionalidadeRaw.replace(/([a-z])([A-Z])/g, "$1-$2");

    return `/home/${funcionalidade}`;
  }

  toggleTopMenu(id: number, event: MouseEvent): void {
    event.stopPropagation();
    this.openedMenu = this.openedMenu === id ? null : id;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-box')) this.dropdownOpen = false;
    if (!target.closest('.top-menu-item')) this.openedMenu = null;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
