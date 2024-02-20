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
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const guid = require("guid");
let UtilsService = class UtilsService {
    constructor(configService) {
        this.configService = configService;
    }
    getAuthHeader(accessToken) {
        return `Bearer ${accessToken}`;
    }
    validateConfig() {
        if (!this.configService.get('msal.authenticationMode')) {
            return 'AuthenticationMode is empty. Please choose MasterUser or ServicePrincipal in config.json.';
        }
        if (this.configService
            .get('msal.authenticationMode')
            .toLowerCase() !== 'masteruser' &&
            this.configService
                .get('msal.authenticationMode')
                .toLowerCase() !== 'serviceprincipal') {
            return 'AuthenticationMode is wrong. Please choose MasterUser or ServicePrincipal in config.json';
        }
        if (!this.configService.get('msal.clientId')) {
            return 'ClientId is empty. Please register your application as Native app in https://dev.powerbi.com/apps and fill Client Id in config.json.';
        }
        if (!guid.isGuid(this.configService.get('msal.clientId'))) {
            return 'ClientId must be a Guid object. Please register your application as Native app in https://dev.powerbi.com/apps and fill Client Id in config.json.';
        }
        if (!this.configService.get('powerbi.reportId')) {
            return 'ReportId is empty. Please select a report you own and fill its Id in config.json.';
        }
        if (!guid.isGuid(this.configService.get('powerbi.reportId'))) {
            return 'ReportId must be a Guid object. Please select a report you own and fill its Id in config.json.';
        }
        if (!this.configService.get('powerbi.workspaceId')) {
            return 'WorkspaceId is empty. Please select a group you own and fill its Id in config.json.';
        }
        if (!guid.isGuid(this.configService.get('powerbi.workspaceId'))) {
            return 'WorkspaceId must be a Guid object. Please select a workspace you own and fill its Id in config.json.';
        }
        if (!this.configService.get('msal.authorityUrl')) {
            return 'AuthorityUrl is empty. Please fill valid AuthorityUrl in config.json.';
        }
        if (this.configService
            .get('msal.authenticationMode')
            .toLowerCase() === 'masteruser') {
            if (!this.configService.get('powerbi.pbiUsername') ||
                !this.configService.get('powerbi.pbiUsername').trim()) {
                return 'PbiUsername is empty. Please fill Power BI username in config.json.';
            }
            if (!this.configService.get('powerbi.pbiPassword') ||
                !this.configService.get('powerbi.pbiPassword').trim()) {
                return 'PbiPassword is empty. Please fill password of Power BI username in config.json.';
            }
        }
        else if (this.configService
            .get('msal.authenticationMode')
            .toLowerCase() === 'serviceprincipal') {
            if (!this.configService.get('msal.clientSecret') ||
                !this.configService.get('msal.clientSecret').trim()) {
                return 'ClientSecret is empty. Please fill Power BI ServicePrincipal ClientSecret in config.json.';
            }
            if (!this.configService.get('msal.tenantId')) {
                return 'TenantId is empty. Please fill the TenantId in config.json.';
            }
            if (!guid.isGuid(this.configService.get('msal.tenantId'))) {
                return 'TenantId must be a Guid object. Please select a workspace you own and fill its Id in config.json.';
            }
        }
    }
};
exports.UtilsService = UtilsService;
exports.UtilsService = UtilsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UtilsService);
//# sourceMappingURL=utils.service.js.map