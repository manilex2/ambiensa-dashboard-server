import { ConfigService } from '@nestjs/config';
import { AuthenticationResult } from '@azure/msal-node';
export declare class AuthenticationService {
    private readonly configService;
    constructor(configService: ConfigService);
    getAccessToken(): Promise<AuthenticationResult>;
}
