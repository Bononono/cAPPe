"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECURITY_SCHEME_SPEC = exports.OPERATION_SECURITY_SPEC = void 0;
exports.OPERATION_SECURITY_SPEC = [{ jwt: [] }];
exports.SECURITY_SCHEME_SPEC = {
    jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
    },
};
//# sourceMappingURL=security.spec.js.map