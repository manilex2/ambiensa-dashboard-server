import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user/userDto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getUser(userDto: UserDto): Promise<object[]>;
}
