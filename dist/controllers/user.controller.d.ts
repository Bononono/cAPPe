import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../components/jwt-authentication';
import { User } from '../models';
export declare const CredentialsRequestBody: {
    description: string;
    required: boolean;
    content: {
        'application/json': {
            schema: {
                type: string;
                required: string[];
                properties: {
                    email: {
                        type: string;
                        format: string;
                    };
                    password: {
                        type: string;
                        minLength: number;
                    };
                };
            };
        };
    };
};
export declare class UserController {
    jwtService: TokenService;
    userService: UserService<User, Credentials>;
    constructor(jwtService: TokenService, userService: UserService<User, Credentials>);
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
}
