import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository,} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Organization, OrganizationRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class OrganizationRepository extends DefaultCrudRepository<Organization,
    typeof Organization.prototype.id,
    OrganizationRelations> {
    public readonly owner: BelongsToAccessor<User, typeof Organization.prototype.id>;

    constructor(
        @inject('datasources.mysql') dataSource: MysqlDataSource,
        @repository.getter('UserRepository')
        protected userRepositoryGetter: Getter<UserRepository>,
    ) {
        super(Organization, dataSource);
        this.owner = this.createBelongsToAccessorFor('owner', userRepositoryGetter);
        this.registerInclusionResolver('owner', this.owner.inclusionResolver);
    }
}
