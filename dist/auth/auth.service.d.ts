import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findByUsername(username: string): Promise<User | undefined>;
    createUser(username: string, password: string): Promise<User>;
}
