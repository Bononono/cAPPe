"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const team_model_1 = require("./team.model");
const user_credentials_model_1 = require("./user-credentials.model");
const uuid_1 = require("uuid");
let User = class User extends repository_1.Entity {
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
], User.prototype, "idUser", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "realm", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "emailVerified", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "verificationToken", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => user_credentials_model_1.UserCredentials),
    tslib_1.__metadata("design:type", user_credentials_model_1.UserCredentials)
], User.prototype, "userCredentials", void 0);
tslib_1.__decorate([
    repository_1.hasMany(() => team_model_1.Team, { keyTo: 'ownerId' }),
    tslib_1.__metadata("design:type", Array)
], User.prototype, "teams", void 0);
User = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
exports.User = User;
//# sourceMappingURL=user.model.js.map