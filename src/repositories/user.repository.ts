import {Getter, inject} from '@loopback/core';
import {
    DefaultCrudRepository,
    HasManyRepositoryFactory,
    HasOneRepositoryFactory,
    repository,
} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Team, User, UserCredentials, UserRelations} from '../models';
import {TeamRepository} from './team.repository';
import {UserCredentialsRepository} from './user-credentials.repository';

export class UserRepository extends DefaultCrudRepository<User,
    typeof User.prototype.id,
    UserRelations> {
    public readonly userCredentials: HasOneRepositoryFactory<UserCredentials,
        typeof User.prototype.id>;

    public readonly teams: HasManyRepositoryFactory<Team,
        typeof User.prototype.id>;

    constructor(
        @inject('datasources.mysql') dataSource: MysqlDataSource,
        @repository.getter('UserCredentialsRepository')
        protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>,
        @repository.getter('TeamRepository')
        protected teamRepositoryGetter: Getter<TeamRepository>,
    ) {
        super(User, dataSource);
        this.teams = this.createHasManyRepositoryFactoryFor(
            'teams',
            teamRepositoryGetter,
        );
        this.registerInclusionResolver('teams', this.teams.inclusionResolver);
        this.userCredentials = this.createHasOneRepositoryFactoryFor(
            'userCredentials',
            userCredentialsRepositoryGetter,
        );
        this.registerInclusionResolver(
            'userCredentials',
            this.userCredentials.inclusionResolver,
        );
    }

    async findCredentials(
        userId: typeof User.prototype.id,
    ): Promise<UserCredentials | undefined> {
        try {
            return await this.userCredentials(userId).get();
        } catch (err) {
            if (err.code === 'ENTITY_NOT_FOUND') {
                return undefined;
            }
            throw err;
        }
    }
}
