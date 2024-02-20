"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 5300,
    origin_url: process.env.ORIGIN_URL,
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
    },
    msal: {
        clientId: process.env.MSAL_CLIENT_ID,
        authorityUrl: process.env.MSAL_AUTHORITY_URL,
        tenantId: process.env.MSAL_TENANT_ID,
        authenticationMode: process.env.MSAL_AUTHENTICATION_MODE,
        scopeBase: process.env.MSAL_SCOPE_BASE,
        clientSecret: process.env.MSAL_CLIENT_SECRET,
    },
    powerbi: {
        pbiUsername: process.env.PBI_USERNAME,
        pbiPassword: process.env.PBI_PASSWORD,
        workspaceId: process.env.PBI_WORKSPACE_ID,
        reportId: process.env.PBI_REPORT_ID,
        apiURL: process.env.PBI_API_URL,
    },
});
exports.configuration = configuration;
//# sourceMappingURL=configuration.js.map