"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthenticationComponent = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const keys_1 = require("./keys");
const jwt_auth_strategy_1 = require("./services/jwt.auth.strategy");
const jwt_service_1 = require("./services/jwt.service");
const user_service_1 = require("./services/user.service");
let JWTAuthenticationComponent = class JWTAuthenticationComponent {
    constructor(app) {
        this.bindings = [
            core_1.Binding.bind(keys_1.TokenServiceBindings.TOKEN_SECRET).to(keys_1.TokenServiceConstants.TOKEN_SECRET_VALUE),
            core_1.Binding.bind(keys_1.TokenServiceBindings.TOKEN_EXPIRES_IN).to(keys_1.TokenServiceConstants.TOKEN_EXPIRES_IN_VALUE),
            core_1.Binding.bind(keys_1.TokenServiceBindings.TOKEN_SERVICE).toClass(jwt_service_1.JWTService),
            core_1.Binding.bind(keys_1.UserServiceBindings.USER_SERVICE).toClass(user_service_1.MyUserService),
        ];
        authentication_1.registerAuthenticationStrategy(app, jwt_auth_strategy_1.JWTAuthenticationStrategy);
    }
};
JWTAuthenticationComponent = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__metadata("design:paramtypes", [core_1.Application])
], JWTAuthenticationComponent);
exports.JWTAuthenticationComponent = JWTAuthenticationComponent;
//# sourceMappingURL=jwt-authentication-component.js.map