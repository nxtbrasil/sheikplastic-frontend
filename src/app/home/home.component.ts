import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menu: any[] = [];

  constructor(private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe({
      next: data => this.menu = data,
      error: err => console.error(err)
    });
  }
}