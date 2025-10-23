import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class MenuService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getMenu(): Observable<any[]> {
    const id = this.auth.getIdFuncionario() || '';
    return this.http.get<any[]>(`${environment.apiBaseUrl}/menu/${id}`);
  }
}