import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LayoutService {

  private collapseState = new BehaviorSubject<boolean>(false);
  sidebarCollapsed$ = this.collapseState.asObservable();

  toggleSidebar() {
    this.collapseState.next(!this.collapseState.value);
  }
}
