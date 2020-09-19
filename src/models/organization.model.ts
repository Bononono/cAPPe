import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';
import {v4 as uuid} from 'uuid';

@model()
export class Organization extends Entity {
    @property({
        id: true,
        type: 'string',
        default: () => uuid(),
    })
    idOrganization: string;

    @property({
        type: 'string',
    })
    name?: string;

    @property({
        type: 'number',
    })
    balance: number;

    @belongsTo(() => User)
    ownerId: string;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Organization>) {
        super(data);
    }
}

export interface OrganizationRelations {
    // describe navigational properties here
}

export type OrganizationWithRelations = Organization & OrganizationRelations;
