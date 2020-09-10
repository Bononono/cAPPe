// Uncomment these imports to begin using these cool features!

import {authenticate, TokenService, UserService} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {get, getModelSchemaRef, post, requestBody} from '@loopback/rest';
import {Credentials, TokenServiceBindings, UserServiceBindings} from '../components/jwt-authentication';
import {User, UserCredentials} from '../models';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {HasOneRepository, model, property, repository} from "@loopback/repository";
import {genSalt, hash} from 'bcryptjs';
import _ from 'lodash';
import {UserRepository} from "../repositories";

@model()
export class ResetPasswordRequest {
    @property({
        type: 'string',
        required: true,
    })
    email: string;
}

@model()
export class NewUserRequest extends User {
    @property({
        type: 'string',
        required: true,
    })
    password: string;
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

    @post('/signup', {
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
    async signUp(
        @requestBody({
            content: {
                'application/json': {
                    schema: getModelSchemaRef(NewUserRequest, {
                        title: 'NewUser',
                    }),
                },
            },
        })
            newUserRequest: NewUserRequest,
    ): Promise<User> {
        const password = await hash(newUserRequest.password, await genSalt());
        const savedUser = await this.userRepository.create(
            _.omit(newUserRequest, 'password'),
        );

        await this.userRepository.userCredentials(savedUser.id).create({password});

        return savedUser;
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
        // const savedUser = await this.userRepository.create(
        //     _.omit(resetPasswordRequest, 'password'),
        // );
        const string = Math.random().toString(36).slice(-8);
        const password = await hash(string, await genSalt());
        // ensure the user exists, and the password is correct
        const user = await this.userRepository.find({where: {email: resetPasswordRequest.email}});

        await this.userRepository.userCredentials(user[0].id).delete();
        await this.userRepository.userCredentials(user[0].id).create({password});

        return string;
    }
}
