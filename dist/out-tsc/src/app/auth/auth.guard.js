import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthGuard = class AuthGuard {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate() {
        if (!this.auth.isLogged()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
};
AuthGuard = __decorate([
    Injectable({ providedIn: 'root' })
], AuthGuard);
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map