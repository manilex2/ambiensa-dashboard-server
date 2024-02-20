import { ConfigService } from '@nestjs/config';
export declare class UtilsService {
    private readonly configService;
    constructor(configService: ConfigService);
    getAuthHeader(accessToken: string): string;
    validateConfig(): string;
}
