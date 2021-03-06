import { UserService } from '@loopback/authentication';
import { UserProfile } from '@loopback/security';
import { User } from '../../../models/user.model';
import { UserRepository } from '../../../repositories/user.repository';
/**
 * A pre-defined type for user credentials. It assumes a user logs in
 * using the email and password. You can modify it if your app has different credential fields
 */
export declare type Credentials = {
    email: string;
    password: string;
};
export declare class MyUserService implements UserService<User, Credentials> {
    userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    verifyCredentials(credentials: Credentials): Promise<User>;
    convertToUserProfile(user: User): UserProfile;
}
