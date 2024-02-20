import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configuration } from '../config/configuration';
import { validationSchema } from '../config/validation';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { MorganMiddleware } from '@nest-middlewares/morgan';
import { MulterModule } from '@nestjs/platform-express';
import { PowerbiModule } from './powerbi/powerbi.module';
import { JoiPipeModule, JoiSchemaOptions } from 'nestjs-joi';

console.log(process.cwd());

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV == 'production' ||
        process.env.NODE_ENV == 'development'
          ? `${process.cwd()}/config/env/${process.env.NODE_ENV}.env`
          : `.env`,
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    AuthModule,
    UsersModule,
    MulterModule.register({
      dest: './uploads', // Directorio de destino para guardar los archivos temporales
    }),
    PowerbiModule,
    JoiPipeModule.forRoot({
      pipeOpts: {
        usePipeValidationException: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
@JoiSchemaOptions({
  allowUnknown: false,
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    MorganMiddleware.configure('dev');
    consumer
      .apply(MorganMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
