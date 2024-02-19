import { NestFactory } from '@nestjs/core';
import { onRequest } from 'firebase-functions/v2/https';
import { AppModule } from './src/app.module';
import {
  NestExpressApplication,
  ExpressAdapter,
} from '@nestjs/platform-express';
import * as express from 'express';
import * as cors from 'cors';
import { join } from 'path';
import { setGlobalOptions } from 'firebase-functions/v2';
import * as admin from 'firebase-admin';

const expressServer = express();

admin.initializeApp();
setGlobalOptions({
  maxInstances: 10,
  timeoutSeconds: 540,
  memory: '1GiB',
});

const createFunction = async (expressInstance): Promise<void> => {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(expressInstance),
    {
      logger: ['error', 'warn', 'log'],
    },
  );
  app.use(cors());
  app.set('trust proxy', true);
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'templates'));
  app.setViewEngine('hbs');
  await app.init();
};
export const dashboardServer = onRequest(
  {
    cors: ['https://ambiensa-9c628.web.app/'],
  },
  async (request, response) => {
    await createFunction(expressServer);
    expressServer(request, response);
  },
);
