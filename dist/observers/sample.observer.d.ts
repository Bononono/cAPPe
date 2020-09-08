import { Application, LifeCycleObserver } from '@loopback/core';
import { OrganizationRepository } from '../repositories/organization.repository';
import { TeamRepository } from '../repositories/team.repository';
import { UserRepository } from '../repositories/user.repository';
/**
 * This class will be bound to the application as a `LifeCycleObserver` during
 * `boot`
 */
export declare class SampleObserver implements LifeCycleObserver {
    private app;
    private organizationRepo;
    private teamRepo;
    private userRepo;
    constructor(app: Application, organizationRepo: OrganizationRepository, teamRepo: TeamRepository, userRepo: UserRepository);
    /**
     * This method will be invoked when the application starts
     */
    start(): Promise<void>;
    /**
     * This method will be invoked when the application stops
     */
    stop(): Promise<void>;
    createUsers(): Promise<void>;
    createOrganizations(): Promise<void>;
    createTeams(): Promise<void>;
    hashPassword(password: string, rounds: number): Promise<string>;
}
