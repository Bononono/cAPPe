import { Organization } from '../models';
import { OrganizationRepository } from '../repositories';
export declare class OrganizationController {
    organizationRepository: OrganizationRepository;
    constructor(organizationRepository: OrganizationRepository);
    listOrganizations(): Promise<Omit<Organization, 'balance'>[]>;
    viewAll(): Promise<Organization[]>;
    findById(id: number): Promise<Organization>;
    donateById(id: number, amount: number): Promise<void>;
    withdrawById(id: number, amount: number): Promise<void>;
}
