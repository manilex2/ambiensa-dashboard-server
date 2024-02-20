import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/dto/user/userDto';
import { AmbiensaUser } from 'src/users/models';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    login(user: AmbiensaUser): Promise<object>;
    getUser(data: UserDto): Promise<AmbiensaUser>;
    obtenerTokenAcceso(oAuth2Client: any): Promise<string>;
    comparePasswords(plainTextPassword: string, hashedPassword: string): Promise<boolean>;
    hashPassword(password: string): Promise<string>;
}
