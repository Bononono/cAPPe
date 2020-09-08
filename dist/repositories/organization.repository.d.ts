import { Getter } from '@loopback/core';
import { BelongsToAccessor, DefaultCrudRepository } from '@loopback/repository';
import { DbDataSource } from '../datasources';
import { Organization, OrganizationRelations, User } from '../models';
import { UserRepository } from './user.repository';
export declare class OrganizationRepository extends DefaultCrudRepository<Organization, typeof Organization.prototype.id, OrganizationRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly owner: BelongsToAccessor<User, typeof Organization.prototype.id>;
    constructor(dataSource: DbDataSource, userRepositoryGetter: Getter<UserRepository>);
}
