"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const express_1 = require("express");
const cors = require("cors");
const path_1 = require("path");
const port = process.env.PORT || 5300;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: ['error', 'warn', 'log'],
    });
    app.setGlobalPrefix('dashboardServer');
    app.use(cors());
    app.set('trust proxy', true);
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ extended: true, limit: '50mb' }));
    app.useStaticAssets((0, path_1.join)(__dirname, '..', 'public'));
    app.setBaseViewsDir((0, path_1.join)(__dirname, '..', 'templates'));
    app.setViewEngine('hbs');
    await app.listen(port, () => {
        console.log(`Escuchando en puerto: ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map