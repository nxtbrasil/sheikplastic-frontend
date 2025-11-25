import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let TokenInterceptor = class TokenInterceptor {
    constructor(auth) {
        this.auth = auth;
    }
    intercept(req, next) {
        const token = this.auth.getToken();
        // URLs que não devem receber Authorization
        const noAuthUrls = [
            'viacep.com.br',
            'brasilapi.com.br',
            'mercadolibre.com'
        ];
        const skipAuth = noAuthUrls.some(url => req.url.includes(url));
        // ✔ Se for uma URL ignorada → NÃO adiciona Authorization
        if (skipAuth) {
            return next.handle(req);
        }
        // ✔ Se tiver token → adiciona Authorization
        if (token) {
            const cloned = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
            return next.handle(cloned);
        }
        // ✔ Se não tiver token → segue normal
        return next.handle(req);
    }
};
TokenInterceptor = __decorate([
    Injectable()
], TokenInterceptor);
export { TokenInterceptor };
//# sourceMappingURL=token.interceptor.js.map