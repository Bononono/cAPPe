import { Entity } from '@loopback/repository';
export declare class Organization extends Entity {
    idOrganization: string;
    name?: string;
    balance: number;
    ownerId: number;
    [prop: string]: any;
    constructor(data?: Partial<Organization>);
}
export interface OrganizationRelations {
}
export declare type OrganizationWithRelations = Organization & OrganizationRelations;
