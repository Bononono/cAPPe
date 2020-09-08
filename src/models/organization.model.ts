import {belongsTo, Entity, model, property} from '@loopback/repository';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Organization extends Entity {
    @property({
        type: 'number',
        id: 1,
        generated: false,
        updateOnly: true,
    })
    id: number;

    @property({
        type: 'string',
    })
    name?: string;

    @property({
        type: 'number',
    })
    balance: number;

    @belongsTo(() => User)
    ownerId: number;

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
