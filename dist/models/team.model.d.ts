import { Entity } from '@loopback/repository';
export declare class Team extends Entity {
    idTeam: string;
    ownerId: number;
    memberIds: number[];
    [prop: string]: any;
    constructor(data?: Partial<Team>);
}
export interface TeamRelations {
}
export declare type TeamWithRelations = Team & TeamRelations;
