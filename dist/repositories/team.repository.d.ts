import { DefaultCrudRepository } from '@loopback/repository';
import { Team, TeamRelations } from '../models';
import { DbDataSource } from '../datasources';
export declare class TeamRepository extends DefaultCrudRepository<Team, typeof Team.prototype.id, TeamRelations> {
    constructor(dataSource: DbDataSource);
}
