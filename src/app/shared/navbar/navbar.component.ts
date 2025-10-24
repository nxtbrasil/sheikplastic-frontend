import { Component, HostListener } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName = '';
  dropdownOpen = false;

  constructor(public auth: AuthService, private router: Router) {
    this.userName = localStorage.getItem('userName') || '';
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Fecha o dropdown clicando fora
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownOpen = false;
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
