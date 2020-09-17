import { TokenService, UserService } from '@loopback/authentication';
import { Credentials } from '../components/jwt-authentication';
import { User, UserRelations } from '../models';
import { UserProfile } from '@loopback/security';
import { UserRepository } from "../repositories";
export declare class ResetPasswordRequest {
    email: string;
}
export declare class NewUserRequest extends User {
    password: string;
}
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
    protected userRepository: UserRepository;
    constructor(jwtService: TokenService, userService: UserService<User, Credentials>, userRepository: UserRepository);
    whoAmI(currentUserProfile: UserProfile): Promise<string>;
    login(credentials: Credentials): Promise<{
        token: string;
    }>;
    createuser(newUserRequest: NewUserRequest): Promise<User>;
    resetPassword(resetPasswordRequest: ResetPasswordRequest): Promise<string>;
    viewAll(): Promise<(User & UserRelations)[]>;
    findById(id: string): Promise<User & UserRelations>;
}
