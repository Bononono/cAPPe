"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SampleObserver = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const organization_repository_1 = require("../repositories/organization.repository");
const team_repository_1 = require("../repositories/team.repository");
const user_repository_1 = require("../repositories/user.repository");
const bcryptjs_1 = require("bcryptjs");
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
let SampleObserver = class SampleObserver {
    constructor(app, organizationRepo, teamRepo, userRepo) {
        this.app = app;
        this.organizationRepo = organizationRepo;
        this.teamRepo = teamRepo;
        this.userRepo = userRepo;
    }
    /**
     * This method will be invoked when the application starts
     */
    async start() {
        // Add your logic for start
        if (process.env.SEED_DATA) {
            // await this.createUsers();
            // await this.createOrganizations();
            // await this.createTeams();
        }
    }
    /**
     * This method will be invoked when the application stops
     */
    async stop() {
        // Add your logic for stop
    }
    // async createUsers(): Promise<void> {
    //     const hashedPassword = await this.hashPassword('opensesame', 10);
    //     const users = [
    //         {
    //             id: 1,
    //             username: 'owner',
    //             email: 'owner@tie.com',
    //             password: hashedPassword,
    //         },
    //         {
    //             id: 2,
    //             username: 'team',
    //             email: 'team@tie.com',
    //             password: hashedPassword,
    //         },
    //         {
    //             id: 3,
    //             username: 'admin',
    //             email: 'admin@tie.com',
    //             password: hashedPassword,
    //         },
    //     ];
    //
    //     for (const u of users) {
    //         await this.userRepo.create(_.pick(u, ['id', 'email', 'username']));
    //         await this.userRepo
    //             .userCredentials(u.id)
    //             .create({password: u.password, userId: u.id});
    //     }
    // }
    // async createOrganizations(): Promise<void> {
    //     const organizations = [
    //         {id: 1, name: 'organization1', balance: 0, ownerId: 1},
    //         {id: 2, name: 'organization2', balance: 0, ownerId: 2},
    //     ];
    //
    //     for (const p of organizations) {
    //         await this.organizationRepo.create(p);
    //     }
    // }
    //
    // async createTeams(): Promise<void> {
    //     const teams = [
    //         {id: 1, ownerId: 1, memberIds: [1, 2]},
    //         {id: 2, ownerId: 2, memberIds: [2]},
    //     ];
    //
    //     for (const t of teams) {
    //         await this.teamRepo.create(t);
    //     }
    // }
    async hashPassword(password, rounds) {
        const salt = await bcryptjs_1.genSalt(rounds);
        return bcryptjs_1.hash(password, salt);
    }
};
SampleObserver = tslib_1.__decorate([
    core_1.lifeCycleObserver(''),
    tslib_1.__param(0, core_1.inject(core_1.CoreBindings.APPLICATION_INSTANCE)),
    tslib_1.__param(1, core_1.inject('repositories.OrganizationRepository')),
    tslib_1.__param(2, core_1.inject('repositories.TeamRepository')),
    tslib_1.__param(3, core_1.inject('repositories.UserRepository')),
    tslib_1.__metadata("design:paramtypes", [core_1.Application,
        organization_repository_1.OrganizationRepository,
        team_repository_1.TeamRepository,
        user_repository_1.UserRepository])
], SampleObserver);
exports.SampleObserver = SampleObserver;
//# sourceMappingURL=sample.observer.js.map