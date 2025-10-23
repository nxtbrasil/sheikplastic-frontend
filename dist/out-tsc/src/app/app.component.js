import { __decorate } from "tslib";
import { Component } from '@angular/core';
let AppComponent = class AppComponent {
};
AppComponent = __decorate([
    Component({
        selector: 'app-root',
        template: `
    <app-navbar></app-navbar>
    <div class="container-fluid">
      <div class="row">
        <div class="col-3 sidebar p-3 bg-light">
          <ng-content select="[sidebar]"></ng-content>
        </div>
        <div class="col-9 p-3">
          <router-outlet></router-outlet>
        </div>
      </div>
    </div>
  `
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map