import { Entity } from '@loopback/repository';
export declare class UserCredentials extends Entity {
    idUserCredentials: string;
    password: string;
    userId: number;
    [prop: string]: any;
    constructor(data?: Partial<UserCredentials>);
}
export interface UserCredentialsRelations {
}
export declare type UserCredentialsWithRelations = UserCredentials & UserCredentialsRelations;
