import { Entity } from '@loopback/repository';
export declare class Team extends Entity {
    id: string;
    ownerId: number;
    memberIds: number[];
    [prop: string]: any;
    constructor(data?: Partial<Team>);
}
export interface TeamRelations {
}
export declare type TeamWithRelations = Team & TeamRelations;
