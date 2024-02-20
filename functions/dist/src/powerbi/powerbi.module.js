"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PowerbiModule = void 0;
const common_1 = require("@nestjs/common");
const powerbi_controller_1 = require("./powerbi.controller");
const powerbi_service_1 = require("./services/powerbi.service");
const authentication_service_1 = require("./services/authentication.service");
const embed_config_service_1 = require("./services/embed-config.service");
const utils_service_1 = require("./services/utils.service");
const axios_1 = require("@nestjs/axios");
let PowerbiModule = class PowerbiModule {
};
exports.PowerbiModule = PowerbiModule;
exports.PowerbiModule = PowerbiModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [powerbi_controller_1.PowerbiController],
        providers: [
            powerbi_service_1.PowerbiService,
            authentication_service_1.AuthenticationService,
            embed_config_service_1.EmbedConfigService,
            utils_service_1.UtilsService,
        ],
    })
], PowerbiModule);
//# sourceMappingURL=powerbi.module.js.map