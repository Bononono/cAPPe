import { DefaultCrudRepository } from '@loopback/repository';
import { Team, TeamRelations } from '../models';
import { MysqlDataSource } from '../datasources';
export declare class TeamRepository extends DefaultCrudRepository<Team, typeof Team.prototype.id, TeamRelations> {
    constructor(dataSource: MysqlDataSource);
}
