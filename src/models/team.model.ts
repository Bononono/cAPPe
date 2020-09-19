import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from "uuid";

@model()
export class Team extends Entity {
    @property({
        id: true,
        type: 'string',
        default: () => uuid(),
    })
    idTeam: string;

    @property({
        type: 'number',
        required: true,
    })
    ownerId: number;

    @property({
        type: 'array',
        itemType: 'number',
        required: true,
    })
    memberIds: number[];

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<Team>) {
        super(data);
    }
}

export interface TeamRelations {
    // describe navigational properties here
}

export type TeamWithRelations = Team & TeamRelations;
