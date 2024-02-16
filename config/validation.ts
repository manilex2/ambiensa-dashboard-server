import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid(
    'development',
    'production',
    'test',
    'provision',
  ),
  JWT_SECRET_KEY: Joi.string().required(),
  PORT: Joi.number().default(5300),
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
