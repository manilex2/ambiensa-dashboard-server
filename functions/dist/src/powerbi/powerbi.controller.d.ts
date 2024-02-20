import { PowerbiService } from './services/powerbi.service';
import { EmbedConfigService } from './services/embed-config.service';
export declare class PowerbiController {
    private powerBITokenService;
    private embedConfigService;
    constructor(powerBITokenService: PowerbiService, embedConfigService: EmbedConfigService);
    getEmbedToken(): Promise<import("./models/embed-config").EmbedConfig | {
        status: number;
        error: string;
    }>;
}
