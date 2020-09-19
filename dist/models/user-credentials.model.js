"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCredentials = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const uuid_1 = require("uuid");
let UserCredentials = class UserCredentials extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        id: true,
        type: 'string',
        default: () => uuid_1.v4(),
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "idUserCredentials", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserCredentials.prototype, "password", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], UserCredentials.prototype, "userId", void 0);
UserCredentials = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserCredentials);
exports.UserCredentials = UserCredentials;
//# sourceMappingURL=user-credentials.model.js.map