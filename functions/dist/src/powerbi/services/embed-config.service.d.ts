import { ConfigService } from '@nestjs/config';
import { EmbedConfig } from '../models/embed-config';
import { AuthenticationService } from './authentication.service';
import { UtilsService } from './utils.service';
import { HttpService } from '@nestjs/axios';
import { RawAxiosRequestHeaders } from 'axios';
export declare class EmbedConfigService {
    private readonly configService;
    private readonly authService;
    private readonly utilService;
    private readonly httpService;
    constructor(configService: ConfigService, authService: AuthenticationService, utilService: UtilsService, httpService: HttpService);
    getEmbedInfo(): Promise<EmbedConfig | {
        status: number;
        error: string;
    }>;
    getRequestHeader(): Promise<RawAxiosRequestHeaders>;
    getEmbedParamsForSingleReport(workspaceId: string, reportId: string, additionalDatasetId?: string): Promise<EmbedConfig>;
    getEmbedTokenForSingleReportSingleWorkspace(reportId: string, datasetIds: any[], targetWorkspaceId: string): Promise<any>;
}
