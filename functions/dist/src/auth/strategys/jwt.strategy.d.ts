import { Strategy } from 'passport-jwt';
import { UserDto } from '../../users/dto/user/userDto';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    constructor();
    validate(payload: UserDto): Promise<{
        usuario: string;
    }>;
}
export {};
