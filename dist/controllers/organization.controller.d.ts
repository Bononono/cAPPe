import { Organization } from '../models';
import { OrganizationRepository } from '../repositories';
export declare class NewOrganizationRequest extends Organization {
    discription: string;
}
export declare class OrganizationController {
    organizationRepository: OrganizationRepository;
    constructor(organizationRepository: OrganizationRepository);
    createOrganization(newOrganizationRequest: NewOrganizationRequest): Promise<Organization>;
    listOrganizations(): Promise<Omit<Organization, 'balance'>[]>;
    viewAll(): Promise<Organization[]>;
    findById(id: string): Promise<Organization>;
}
