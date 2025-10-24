import { Component } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  userName = '';

  constructor(public auth: AuthService, private router: Router) {
    this.userName = localStorage.getItem('userName') || '';
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
