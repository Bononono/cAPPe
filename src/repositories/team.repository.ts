import {DefaultCrudRepository} from '@loopback/repository';
import {Team, TeamRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TeamRepository extends DefaultCrudRepository<Team,
    typeof Team.prototype.id,
    TeamRelations> {
    constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
        super(Team, dataSource);
    }
}
