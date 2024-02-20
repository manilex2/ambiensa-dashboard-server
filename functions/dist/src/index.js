"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardServer = void 0;
const core_1 = require("@nestjs/core");
const https_1 = require("firebase-functions/v2/https");
const app_module_1 = require("./app.module");
const platform_express_1 = require("@nestjs/platform-express");
const express = require("express");
const path_1 = require("path");
const v2_1 = require("firebase-functions/v2");
const admin = require("firebase-admin");
const expressServer = express();
admin.initializeApp();
(0, v2_1.setGlobalOptions)({
    maxInstances: 10,
    timeoutSeconds: 540,
    memory: '1GiB',
});
const createFunction = async (expressInstance) => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance), {
        logger: ['error', 'warn', 'log'],
    });
    app.enableCors();
    app.set('trust proxy', true);
    app.use(express.json({ limit: '50mb' }));
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'templates'));
    app.setViewEngine('hbs');
    await app.init();
};
exports.dashboardServer = (0, https_1.onRequest)({
    cors: ['https://ambiensa-9c628.web.app'],
}, async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
});
//# sourceMappingURL=index.js.map