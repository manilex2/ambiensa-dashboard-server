import { PowerBiReportDetails } from './embed-report-config';
export declare class EmbedConfig {
    type?: string;
    reportsDetail?: PowerBiReportDetails[];
    embedToken?: {
        token: string;
        expiration: string;
    };
    embedUrl?: PowerBiReportDetails[];
    expiry?: string;
    status?: number;
    error?: string;
    accessToken?: string;
    constructor(type?: string, reportsDetail?: PowerBiReportDetails[], embedToken?: {
        token: string;
        expiration: string;
    }, embedUrl?: PowerBiReportDetails[], expiry?: string, status?: number, error?: string, accessToken?: string);
}
