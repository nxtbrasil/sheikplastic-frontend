import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
let SubmenuComponent = class SubmenuComponent {
    constructor() {
        this.nodes = [];
        this.expanded = false;
    }
    toggleExpand() {
        this.expanded = !this.expanded;
    }
};
__decorate([
    Input()
], SubmenuComponent.prototype, "nodes", void 0);
SubmenuComponent = __decorate([
    Component({
        selector: 'app-submenu',
        templateUrl: './submenu.component.html',
        styleUrls: ['./submenu.component.css'],
        animations: [
            trigger('expandCollapse', [
                state('collapsed', style({
                    height: '0px',
                    opacity: 0,
                    overflow: 'hidden',
                })),
                state('expanded', style({
                    height: '*',
                    opacity: 1,
                    overflow: 'hidden',
                })),
                transition('collapsed <=> expanded', [
                    animate('250ms ease-in-out')
                ])
            ])
        ]
    })
], SubmenuComponent);
export { SubmenuComponent };
//# sourceMappingURL=submenu.component.js.map