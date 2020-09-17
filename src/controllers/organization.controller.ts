import {authenticate} from '@loopback/authentication';
import {authorize} from '@loopback/authorization';
import {model, property, repository} from '@loopback/repository';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import _ from 'lodash';
import {assignOrganizationInstanceId} from '../components/casbin-authorization';
import {Organization, User} from '../models';
import {OrganizationRepository} from '../repositories';
import {genSalt, hash} from "bcryptjs";

@model()
export class NewOrganizationRequest extends Organization {
    @property({
        type: 'string',
        required: true,
    })
    discription: string;
}

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

    @post('/createorganization', {
        responses: {
            '200': {
                description: 'Organization',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': Organization,
                        },
                    },
                },
            },
        },
    })
    async createOrganization(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(NewOrganizationRequest, {
                        title: 'NewOrganization',
                    }),
                },
            },
        })
            newOrganizationRequest: NewOrganizationRequest,
    ): Promise<Organization> {
        const savedOrganization = await this.organizationRepository.create(newOrganizationRequest);

        return savedOrganization;
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
    @get('/organizations/{id}', {
        responses: {
            '200': {
                description: 'show a organization',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(Organization),
                    },
                },
            },
        },
    })
    @authenticate('jwt')
    async findById(@param.path.number('id') id: string): Promise<Organization> {
        return this.organizationRepository.findById(id);
    }

}
