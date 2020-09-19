// Uncomment these imports to begin using these cool features!

import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, param, post, requestBody} from '@loopback/rest';
import {Credentials, TokenServiceBindings, UserServiceBindings} from '../components/jwt-authentication';
import {Organization, User, UserRelations} from '../models';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {model, property, repository} from "@loopback/repository";
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {UserRepository} from "../repositories";
import {authorize} from "@loopback/authorization";

@model()
export class ResetPasswordRequest {
    @property({
        type: 'string',
        required: true,
    })
    email: string;
}

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

export const CredentialsRequestBody = {
    description: 'The input of login function',
    required: true,
    content: {
        'application/json': {schema: CredentialsSchema},
    },
};

export class UserController {
    constructor(
        @inject(TokenServiceBindings.TOKEN_SERVICE)
        public jwtService: TokenService,
        @inject(UserServiceBindings.USER_SERVICE)
        public userService: UserService<User, Credentials>,
        @repository(UserRepository)
        protected userRepository: UserRepository,
    ) {
    }

    @authenticate('jwt')
    @get('/whoAmI', {
        responses: {
            '200': {
                description: '',
                schema: {
                    type: 'string',
                },
            },
        },
    })
    async whoAmI(
        @inject(SecurityBindings.USER)
            currentUserProfile: UserProfile,
    ): Promise<string> {
        return currentUserProfile[securityId];
    }

    @post('/users/login', {
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
    })
    async login(
        @requestBody(CredentialsRequestBody) credentials: Credentials,
    ): Promise<{ token: string }> {
        // ensure the user exists, and the password is correct
        const user = await this.userService.verifyCredentials(credentials);

        // convert a User object into a UserProfile object (reduced set of properties)
        const userProfile = this.userService.convertToUserProfile(user);

        // create a JSON Web Token based on the user profile
        const token = await this.jwtService.generateToken(userProfile);

        return {token};
    }

    @post('/createuser', {
        responses: {
            '200': {
                description: 'User',
                content: {
                    'application/json': {
                        schema: {
                            'x-ts-type': User,
                        },
                    },
                },
            },
        },
    })
    async createuser(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(User, {
                        title: 'NewUser',
                    }),
                },
            },
        })
            newUserRequest: User,
    ): Promise<String> {
        const randomString = "opensesame";
        // const randomString = Math.random().toString(36).slice(-8);
        const password = await hash(randomString, await genSalt());
        const savedUser = await this.userRepository.create(
            _.omit(newUserRequest, 'password'),
        );

        await this.userRepository.userCredentials(savedUser.id).create({password});

        return randomString;
    }


    @post('/resetPassword', {
        responses: {
            '200': {
                description: 'The input of the password reset function',
                required: true,
                content: {
                    'application/json': {email: String},
                },
            },
        },
    })
    async resetPassword(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(ResetPasswordRequest, {
                        title: 'resetPassword',
                    }),
                },
            },
        })
            resetPasswordRequest: ResetPasswordRequest,
    ): Promise<string> {
        const randomString = Math.random().toString(36).slice(-8);
        const password = await hash(randomString, await genSalt());
        // ensure the user exists, and the password is correct
        const user = await this.userRepository.find({where: {email: resetPasswordRequest.email}});

        await this.userRepository.userCredentials(user[0].id).delete();
        await this.userRepository.userCredentials(user[0].id).create({password});

        return randomString;
    }

    // VIEW ALL PROJECTS (including balance)
    @get('/view-all-users', {
        responses: {
            '200': {
                description: 'Array of all user model instances',
                content: {
                    'application/json': {
                        schema: {
                            type: 'array',
                            items: getModelSchemaRef(User),
                        },
                    },
                },
            },
        },
    })
    @authenticate('jwt')
    async viewAll(): Promise<(User & UserRelations)[]> {
        return this.userRepository.find();
    }

    // SHOW BALANCE: get organization by id
    @get('/users/{id}', {
        responses: {
            '200': {
                description: 'show details of a user',
                content: {
                    'application/json': {
                        schema: getModelSchemaRef(User),
                    },
                },
            },
        },
    })
    @authenticate('jwt')
    async findById(@param.path.number('id') id: string): Promise<User & UserRelations> {
        return this.userRepository.findById(id);
    }
}
