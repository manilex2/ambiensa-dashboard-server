"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationSchema = void 0;
const Joi = require("joi");
exports.validationSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test', 'provision'),
    JWT_SECRET_KEY: Joi.string().required(),
    ORIGIN_URL: Joi.string().required(),
    MSAL_CLIENT_ID: Joi.string().required(),
    MSAL_AUTHORITY_URL: Joi.string().required(),
    MSAL_TENANT_ID: Joi.string().required(),
    MSAL_AUTHENTICATION_MODE: Joi.string().required(),
    MSAL_SCOPE_BASE: Joi.string().required(),
    MSAL_CLIENT_SECRET: Joi.optional(),
    PBI_USERNAME: Joi.string().required(),
    PBI_PASSWORD: Joi.string().required(),
    PBI_WORKSPACE_ID: Joi.string().required(),
    PBI_REPORT_ID: Joi.string().required(),
    PBI_API_URL: Joi.string().required(),
});
//# sourceMappingURL=validation.js.map