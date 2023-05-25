import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfig from 'appConfig';
import { winstonLogger } from 'log';

(async function () {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });
  await new AppConfig(app)
    .enableCors({
      origin: '*',
    })
    .configureMiddleware()
    .configurePipes()
    .init();
})();
