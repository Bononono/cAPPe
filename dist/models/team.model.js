"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Team = class Team extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        id: 1,
        generated: false,
        updateOnly: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Team.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Team.prototype, "ownerId", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Team.prototype, "memberIds", void 0);
Team = tslib_1.__decorate([
    repository_1.model({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Team);
exports.Team = Team;
//# sourceMappingURL=team.model.js.map