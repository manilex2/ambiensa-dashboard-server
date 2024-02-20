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
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const msal_node_1 = require("@azure/msal-node");
let AuthenticationService = class AuthenticationService {
    constructor(configService) {
        this.configService = configService;
    }
    async getAccessToken() {
        const msalConfig = {
            auth: {
                clientId: this.configService.get('msal.clientId'),
                authority: `${this.configService.get('msal.authorityUrl')}${this.configService.get('msal.tenantId')}`,
                clientSecret: '',
            },
        };
        if (this.configService
            .get('msal.authenticationMode')
            .toLowerCase() === 'masteruser') {
            const clientApplication = new msal_node_1.PublicClientApplication(msalConfig);
            const usernamePasswordRequest = {
                scopes: [this.configService.get('msal.scopeBase')],
                username: this.configService.get('powerbi.pbiUsername'),
                password: this.configService.get('powerbi.pbiPassword'),
            };
            return clientApplication.acquireTokenByUsernamePassword(usernamePasswordRequest);
        }
        if (this.configService
            .get('msal.authenticationMode')
            .toLowerCase() === 'serviceprincipal') {
            msalConfig.auth.clientSecret =
                this.configService.get('msal.clientSecret');
            const clientApplication = new msal_node_1.ConfidentialClientApplication(msalConfig);
            const clientCredentialRequest = {
                scopes: [this.configService.get('msal.scopeBase')],
            };
            return clientApplication.acquireTokenByClientCredential(clientCredentialRequest);
        }
    }
};
exports.AuthenticationService = AuthenticationService;
exports.AuthenticationService = AuthenticationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AuthenticationService);
//# sourceMappingURL=authentication.service.js.map