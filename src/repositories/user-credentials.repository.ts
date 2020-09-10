import {DefaultCrudRepository} from '@loopback/repository';
import {UserCredentials, UserCredentialsRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class UserCredentialsRepository extends DefaultCrudRepository<UserCredentials,
    typeof UserCredentials.prototype.id,
    UserCredentialsRelations> {
    constructor(@inject('datasources.mysql') dataSource: MysqlDataSource) {
        super(UserCredentials, dataSource);
    }
}
