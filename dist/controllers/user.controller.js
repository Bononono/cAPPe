"use strict";
// Uncomment these imports to begin using these cool features!
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.CredentialsRequestBody = exports.NewUserRequest = exports.ResetPasswordRequest = void 0;
const tslib_1 = require("tslib");
const authentication_1 = require("@loopback/authentication");
const core_1 = require("@loopback/core");
const rest_1 = require("@loopback/rest");
const jwt_authentication_1 = require("../components/jwt-authentication");
const models_1 = require("../models");
const security_1 = require("@loopback/security");
const repository_1 = require("@loopback/repository");
const bcryptjs_1 = require("bcryptjs");
const lodash_1 = tslib_1.__importDefault(require("lodash"));
const repositories_1 = require("../repositories");
let ResetPasswordRequest = class ResetPasswordRequest {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], ResetPasswordRequest.prototype, "email", void 0);
ResetPasswordRequest = tslib_1.__decorate([
    repository_1.model()
], ResetPasswordRequest);
exports.ResetPasswordRequest = ResetPasswordRequest;
let NewUserRequest = class NewUserRequest extends models_1.User {
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NewUserRequest.prototype, "password", void 0);
NewUserRequest = tslib_1.__decorate([
    repository_1.model()
], NewUserRequest);
exports.NewUserRequest = NewUserRequest;
const CredentialsSchema = {
    type: 'object',
    required: ['email', 'password'],
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            minLength: 8,
        },
    },
};
exports.CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': { schema: CredentialsSchema },
    },
};
let UserController = class UserController {
    constructor(jwtService, userService, userRepository) {
        this.jwtService = jwtService;
        this.userService = userService;
        this.userRepository = userRepository;
    }
    async whoAmI(currentUserProfile) {
        return currentUserProfile[security_1.securityId];
    }
    async login(credentials) {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);
        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);
        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);
        return { token };
    }
    async createuser(newUserRequest) {
        const password = await bcryptjs_1.hash(newUserRequest.password, await bcryptjs_1.genSalt());
        const savedUser = await this.userRepository.create(lodash_1.default.omit(newUserRequest, 'password'));
        await this.userRepository.userCredentials(savedUser.id).create({ password });
        return savedUser;
    }
    async resetPassword(resetPasswordRequest) {
        // const savedUser = await this.userRepository.create(
        //     _.omit(resetPasswordRequest, 'password'),
        // );
        const string = Math.random().toString(36).slice(-8);
        const password = await bcryptjs_1.hash(string, await bcryptjs_1.genSalt());
        // ensure the user exists, and the password is correct
        const user = await this.userRepository.find({ where: { email: resetPasswordRequest.email } });
        await this.userRepository.userCredentials(user[0].id).delete();
        await this.userRepository.userCredentials(user[0].id).create({ password });
        return string;
    }
    // VIEW ALL PROJECTS (including balance)
    async viewAll() {
        return this.userRepository.find();
    }
    // SHOW BALANCE: get organization by id
    async findById(id) {
        return this.userRepository.findById(id);
    }
};
tslib_1.__decorate([
    authentication_1.authenticate('jwt'),
    rest_1.get('/whoAmI', {
        responses: {
            '200': {
                description: '',
                schema: {
                    type: 'string',
                },
            },
        },
    }),
    tslib_1.__param(0, core_1.inject(security_1.SecurityBindings.USER)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "whoAmI", null);
tslib_1.__decorate([
    rest_1.post('/users/login', {
        responses: {
            '200': {
                description: 'Token',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                token: {
                                    type: 'string',
                                },
                            },
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody(exports.CredentialsRequestBody)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
tslib_1.__decorate([
    rest_1.post('/createuser', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': models_1.User,
                        },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(NewUserRequest, {
                    title: 'NewUser',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [NewUserRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createuser", null);
tslib_1.__decorate([
    rest_1.post('/resetPassword', {
        responses: {
            '200': {
                description: 'The input of the password reset function',
                required: true,
                content: {
                    'application/json': { email: String },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(ResetPasswordRequest, {
                    title: 'resetPassword',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [ResetPasswordRequest]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "resetPassword", null);
tslib_1.__decorate([
    rest_1.get('/view-all-users', {
        responses: {
            '200': {
                description: 'Array of all user model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: rest_1.getModelSchemaRef(models_1.User),
                        },
                    },
                },
            },
        },
    }),
    authentication_1.authenticate('jwt'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "viewAll", null);
tslib_1.__decorate([
    rest_1.get('/users/{id}', {
        responses: {
            '200': {
                description: 'show details of a user',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.User),
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
], UserController.prototype, "findById", null);
UserController = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject(jwt_authentication_1.TokenServiceBindings.TOKEN_SERVICE)),
    tslib_1.__param(1, core_1.inject(jwt_authentication_1.UserServiceBindings.USER_SERVICE)),
    tslib_1.__param(2, repository_1.repository(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, repositories_1.UserRepository])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map