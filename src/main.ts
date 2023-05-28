import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import AppConfig from '@/appConfig';
import { winstonLogger } from '@/log';

import { AppModule } from './app.module';

(async function () {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger,
  });

  await new AppConfig(app)
    .enableCors({
      origin: '*',
    })
    .configureMiddleware()
    .configurePipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      })
    )
    .init();
})();
