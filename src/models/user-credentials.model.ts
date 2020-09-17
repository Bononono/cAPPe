import {Entity, model, property} from '@loopback/repository';
import {v4 as uuid} from "uuid";

@model()
export class UserCredentials extends Entity {
    @property({
        id: true,
        type: 'string',
        generated: false,
        default: () => uuid(),
    })
    id: string;

    @property({
        type: 'string',
        required: true,
    })
    password: string;

    @property({
        type: 'number',
        required: true,
    })
    userId: number;

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<UserCredentials>) {
        super(data);
    }
}

export interface UserCredentialsRelations {
    // describe navigational properties here
}

export type UserCredentialsWithRelations = UserCredentials &
    UserCredentialsRelations;
