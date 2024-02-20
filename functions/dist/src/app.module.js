"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const configuration_1 = require("../config/configuration");
const validation_1 = require("../config/validation");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const jwt_auth_guard_1 = require("./auth/guards/jwt-auth.guard");
const core_1 = require("@nestjs/core");
const morgan_1 = require("@nest-middlewares/morgan");
const platform_express_1 = require("@nestjs/platform-express");
const powerbi_module_1 = require("./powerbi/powerbi.module");
const nestjs_joi_1 = require("nestjs-joi");
console.log(process.cwd());
let AppModule = class AppModule {
    configure(consumer) {
        morgan_1.MorganMiddleware.configure('dev');
        consumer
            .apply(morgan_1.MorganMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV == 'production' ||
                    process.env.NODE_ENV == 'development'
                    ? `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`
                    : `.env`,
                isGlobal: true,
                load: [configuration_1.configuration],
                validationSchema: validation_1.validationSchema,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            platform_express_1.MulterModule.register({
                dest: './uploads',
            }),
            powerbi_module_1.PowerbiModule,
            nestjs_joi_1.JoiPipeModule.forRoot({
                pipeOpts: {
                    usePipeValidationException: true,
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
        ],
    }),
    (0, nestjs_joi_1.JoiSchemaOptions)({
        allowUnknown: false,
    })
], AppModule);
//# sourceMappingURL=app.module.js.map