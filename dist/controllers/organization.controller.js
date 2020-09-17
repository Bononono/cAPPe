"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationController = exports.NewOrganizationRequest = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const authorization_1 = require("@loopback/authorization");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const casbin_authorization_1 = require("../components/casbin-authorization");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let NewOrganizationRequest = class NewOrganizationRequest extends models_1.Organization {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NewOrganizationRequest.prototype, "discription", void 0);
NewOrganizationRequest = tslib_1.__decorate([
    repository_1.model()
], NewOrganizationRequest);
exports.NewOrganizationRequest = NewOrganizationRequest;
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
        voters: [casbin_authorization_1.assignOrganizationInstanceId],
    },
    donate: {
        resource: RESOURCE_NAME,
        scopes: ['donate'],
        allowedRoles: ['admin', 'owner', 'team'],
        voters: [casbin_authorization_1.assignOrganizationInstanceId],
    },
    withdraw: {
        resource: RESOURCE_NAME,
        scopes: ['withdraw'],
        allowedRoles: ['owner'],
        voters: [casbin_authorization_1.assignOrganizationInstanceId],
    },
};
// TODO: add other CRUD methods and corresponding ACL
let OrganizationController = class OrganizationController {
    constructor(organizationRepository) {
        this.organizationRepository = organizationRepository;
    }
    async createOrganization(newOrganizationRequest) {
        const savedOrganization = await this.organizationRepository.create(newOrganizationRequest);
        return savedOrganization;
    }
    // LIST PROJECTS (balance is not public)
    async listOrganizations() {
        const organizations = await this.organizationRepository.find();
        return organizations.map(o => lodash_1.default.omit(o, 'balance'));
    }
    // VIEW ALL PROJECTS (including balance)
    async viewAll() {
        return this.organizationRepository.find();
    }
    // SHOW BALANCE: get organization by id
    async findById(id) {
        return this.organizationRepository.findById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/createorganization', {
        responses: {
            '200': {
                description: 'Organization',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.Organization,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(NewOrganizationRequest, {
                    title: 'NewOrganization',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NewOrganizationRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "createOrganization", null);
tslib_1.__decorate([
    rest_1.get('/list-organizations', {
        responses: {
            '200': {
                description: 'List all the organization model instances without balance',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Organization, {
                                title: 'OrganizationPublic',
                                exclude: ['balance'],
                            }),
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "listOrganizations", null);
tslib_1.__decorate([
    rest_1.get('/view-all-organizations', {
        responses: {
            '200': {
                description: 'Array of all Organization model instances including balance',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.Organization),
                        },
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    authorization_1.authorize(ACL_PROJECT['view-all']),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "viewAll", null);
tslib_1.__decorate([
    rest_1.get('/organizations/{id}', {
        responses: {
            '200': {
                description: 'show a organization',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Organization),
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], OrganizationController.prototype, "findById", null);
OrganizationController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.OrganizationRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.OrganizationRepository])
], OrganizationController);
exports.OrganizationController = OrganizationController;
//# sourceMappingURL=organization.controller.js.map