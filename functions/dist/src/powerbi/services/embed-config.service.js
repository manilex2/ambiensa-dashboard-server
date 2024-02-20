"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmbedConfigService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const embed_report_config_1 = require("../models/embed-report-config");
const embed_config_1 = require("../models/embed-config");
const authentication_service_1 = require("./authentication.service");
const utils_service_1 = require("./utils.service");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let EmbedConfigService = class EmbedConfigService {
    constructor(configService, authService, utilService, httpService) {
        this.configService = configService;
        this.authService = authService;
        this.utilService = utilService;
        this.httpService = httpService;
    }
    async getEmbedInfo() {
        try {
            const embedParams = await this.getEmbedParamsForSingleReport(this.configService.get('powerbi.workspaceId'), this.configService.get('powerbi.reportId'));
            return {
                accessToken: embedParams.embedToken.token,
                embedUrl: embedParams.reportsDetail,
                expiry: embedParams.embedToken.expiration,
                status: 200,
            };
        }
        catch (err) {
            console.log(err);
            return {
                status: err.status,
                error: `Hubo un error al traer los detalles embedidos de los reportes: ${err}`,
            };
        }
    }
    async getRequestHeader() {
        let tokenResponse;
        let errorResponse;
        try {
            tokenResponse = await this.authService.getAccessToken();
            const token = tokenResponse.accessToken;
            return {
                'Content-Type': 'application/json',
                Authorization: this.utilService.getAuthHeader(token),
            };
        }
        catch (err) {
            if (err.hasOwnProperty('error_description') &&
                err.hasOwnProperty('error')) {
                errorResponse = err.error_description;
            }
            else {
                errorResponse = err.toString();
            }
            return {
                status: 401,
                error: errorResponse,
            };
        }
    }
    async getEmbedParamsForSingleReport(workspaceId, reportId, additionalDatasetId) {
        const reportInGroupApi = `https://api.powerbi.com/v1.0/myorg/groups/${workspaceId}/reports/${reportId}`;
        const headers = await this.getRequestHeader();
        const { data, status } = await (0, rxjs_1.firstValueFrom)(this.httpService
            .get(reportInGroupApi, {
            headers: headers,
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            throw `Ocurrio un error en el get: ${error}`;
        })));
        if (status != 200)
            throw await data;
        const resultJson = await data;
        const reportDetails = new embed_report_config_1.PowerBiReportDetails(resultJson.id, resultJson.name, resultJson.embedUrl);
        const reportEmbedConfig = new embed_config_1.EmbedConfig();
        reportEmbedConfig.reportsDetail = [reportDetails];
        const datasetIds = [resultJson.datasetId];
        if (additionalDatasetId) {
            datasetIds.push(additionalDatasetId);
        }
        reportEmbedConfig.embedToken =
            await this.getEmbedTokenForSingleReportSingleWorkspace(reportId, datasetIds, workspaceId);
        return reportEmbedConfig;
    }
    async getEmbedTokenForSingleReportSingleWorkspace(reportId, datasetIds, targetWorkspaceId) {
        const formData = {
            reports: [
                {
                    id: reportId,
                },
            ],
        };
        formData['datasets'] = [];
        for (const datasetId of datasetIds) {
            formData['datasets'].push({
                id: datasetId,
            });
        }
        if (targetWorkspaceId) {
            formData['targetWorkspaces'] = [];
            formData['targetWorkspaces'].push({
                id: targetWorkspaceId,
            });
        }
        const embedTokenApi = 'https://api.powerbi.com/v1.0/myorg/GenerateToken';
        const headers = await this.getRequestHeader();
        const { data, status } = await (0, rxjs_1.lastValueFrom)(this.httpService
            .post(embedTokenApi, JSON.stringify(formData), {
            headers,
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            throw `Ocurrio un error en el post: ${error}`;
        })));
        if (status != 200)
            throw await data;
        return await data;
    }
};
exports.EmbedConfigService = EmbedConfigService;
exports.EmbedConfigService = EmbedConfigService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        authentication_service_1.AuthenticationService,
        utils_service_1.UtilsService,
        axios_1.HttpService])
], EmbedConfigService);
//# sourceMappingURL=embed-config.service.js.map