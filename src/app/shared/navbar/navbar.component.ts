import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  userName = '';

  constructor(public auth: AuthService, private router: Router) {
    this.userName = localStorage.getItem('userName') || '';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
