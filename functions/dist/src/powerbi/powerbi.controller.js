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
exports.PowerbiController = void 0;
const common_1 = require("@nestjs/common");
const powerbi_service_1 = require("./services/powerbi.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const embed_config_service_1 = require("./services/embed-config.service");
let PowerbiController = class PowerbiController {
    constructor(powerBITokenService, embedConfigService) {
        this.powerBITokenService = powerBITokenService;
        this.embedConfigService = embedConfigService;
    }
    async getEmbedToken() {
        try {
            const configSuccess = await this.powerBITokenService.getToken();
            if (configSuccess.status != 200) {
                throw configSuccess;
            }
            const result = await this.embedConfigService.getEmbedInfo();
            return result;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status);
        }
    }
};
exports.PowerbiController = PowerbiController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('getToken'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PowerbiController.prototype, "getEmbedToken", null);
exports.PowerbiController = PowerbiController = __decorate([
    (0, common_1.Controller)('powerbi'),
    __metadata("design:paramtypes", [powerbi_service_1.PowerbiService,
        embed_config_service_1.EmbedConfigService])
], PowerbiController);
//# sourceMappingURL=powerbi.controller.js.map