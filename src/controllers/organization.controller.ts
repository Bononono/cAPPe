import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, patch} from '@loopback/rest';
import _ from 'lodash';
import {assignOrganizationInstanceId} from '../components/casbin-authorization';
import {Organization} from '../models';
import {OrganizationRepository} from '../repositories';

// TBD: refactor the ACLs to a separate file
const RESOURCE_NAME = 'organization';
const ACL_PROJECT = {
    'view-all': {
        resource: `${RESOURCE_NAME}*`,
        scopes: ['view-all'],
        allowedRoles: ['admin'],
    },
    'show-balance': {
        resource: RESOURCE_NAME,
        scopes: ['show-balance'],
        allowedRoles: ['owner', 'team'],
        voters: [assignOrganizationInstanceId],
    },
    donate: {
        resource: RESOURCE_NAME,
        scopes: ['donate'],
        allowedRoles: ['admin', 'owner', 'team'],
        voters: [assignOrganizationInstanceId],
    },
    withdraw: {
        resource: RESOURCE_NAME,
        scopes: ['withdraw'],
        allowedRoles: ['owner'],
        voters: [assignOrganizationInstanceId],
    },
};

// TODO: add other CRUD methods and corresponding ACL
export class OrganizationController {
    constructor(
        @repository(OrganizationRepository)
        public organizationRepository: OrganizationRepository,
    ) {
    }

    // LIST PROJECTS (balance is not public)
    @get('/list-organizations', {
        responses: {
            '200': {
                description: 'List all the organization model instances without balance',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Organization, {
                                title: 'OrganizationPublic',
                                exclude: ['balance'],
                            }),
                        },
                    },
                },
            },
        },
    })
    async listOrganizations(): Promise<Omit<Organization, 'balance'>[]> {
        const organizations = await this.organizationRepository.find();
        return organizations.map(o => _.omit(o, 'balance'));
    }

    // VIEW ALL PROJECTS (including balance)
    @get('/view-all-organizations', {
        responses: {
            '200': {
                description: 'Array of all Organization model instances including balance',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(Organization),
                        },
                    },
                },
            },
        },
    })
    @authenticate('jwt')
    @authorize(ACL_PROJECT['view-all'])
    async viewAll(): Promise<Organization[]> {
        return this.organizationRepository.find();
    }

    // SHOW BALANCE: get organization by id
    @get('/organizations/{id}/show-balance', {
        responses: {
            '200': {
                description: 'show balance of a organization',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Organization),
                    },
                },
            },
        },
    })
    @authenticate('jwt')
    @authorize(ACL_PROJECT['show-balance'])
    async findById(@param.path.number('id') id: number): Promise<Organization> {
        return this.organizationRepository.findById(id);
    }

    // DONATE BY ID
    @patch('/organizations/{id}/donate', {
        responses: {
            '204': {
                description: 'Organization donate success',
            },
        },
    })
    @authenticate('jwt')
    @authorize(ACL_PROJECT.donate)
    async donateById(
        @param.path.number('id') id: number,
        @param.query.number('amount') amount: number,
    ): Promise<void> {
        const organization = await this.organizationRepository.findById(id);
        await this.organizationRepository.updateById(id, {
            balance: organization.balance + amount,
        });
        // TBD: return new balance
    }

    // WITHDRAW BY ID
    @patch('/organizations/{id}/withdraw', {
        responses: {
            '204': {
                description: 'Organization withdraw success',
            },
        },
    })
    @authenticate('jwt')
    @authorize(ACL_PROJECT.withdraw)
    async withdrawById(
        @param.path.number('id') id: number,
        @param.query.number('amount') amount: number,
    ): Promise<void> {
        const organization = await this.organizationRepository.findById(id);
        if (organization.balance < amount) {
            throw new Error('Balance is not enough.');
        }
        await this.organizationRepository.updateById(id, {
            balance: organization.balance - amount,
        });
        // TBD: return new balance
    }
}
