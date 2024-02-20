import { HttpStatus } from '@nestjs/common';
import { UtilsService } from './utils.service';
export declare class PowerbiService {
    private readonly utilsService;
    constructor(utilsService: UtilsService);
    getToken(): Promise<{
        status: HttpStatus;
        message: string;
    }>;
}
