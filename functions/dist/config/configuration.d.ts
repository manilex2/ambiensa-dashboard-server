export declare const configuration: () => {
    NODE_ENV: string;
    port: number;
    origin_url: string;
    jwt: {
        secret: string;
    };
    msal: {
        clientId: string;
        authorityUrl: string;
        tenantId: string;
        authenticationMode: string;
        scopeBase: string;
        clientSecret: string;
    };
    powerbi: {
        pbiUsername: string;
        pbiPassword: string;
        workspaceId: string;
        reportId: string;
        apiURL: string;
    };
};
