import {Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Team} from './team.model';
import {UserCredentials} from './user-credentials.model';
import {v4 as uuid} from 'uuid';

@model()
export class User extends Entity {
    // must keep it
    @property({
        id: true,
        type: 'string',
        default: () => uuid(),
    })
    idUser: string;

    @property({
        type: 'string',
    })
    realm?: string;

    // must keep it
    @property({
        type: 'string',
    })
    username?: string;

    // must keep it
    @property({
        type: 'string',
        required: true,
    })
    email: string;

    @property({
        type: 'boolean',
    })
    emailVerified?: boolean;

    @property({
        type: 'string',
    })
    verificationToken?: string;

    @hasOne(() => UserCredentials)
    userCredentials: UserCredentials;

    @hasMany(() => Team, {keyTo: 'ownerId'})
    teams: Team[];

    // Define well-known properties here

    // Indexer property to allow additional data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [prop: string]: any;

    constructor(data?: Partial<User>) {
        super(data);
    }
}

export interface UserRelations {
    // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
