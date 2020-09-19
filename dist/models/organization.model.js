"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Organization = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
const uuid_1 = require("uuid");
let Organization = class Organization extends repository_1.Entity {
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
], Organization.prototype, "idOrganization", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Organization.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Organization.prototype, "balance", void 0);
tslib_1.__decorate([
    repository_1.belongsTo(() => user_model_1.User),
    tslib_1.__metadata("design:type", Number)
], Organization.prototype, "ownerId", void 0);
Organization = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Organization);
exports.Organization = Organization;
//# sourceMappingURL=organization.model.js.map