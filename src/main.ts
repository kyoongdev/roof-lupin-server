import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { useContainer, ValidationError } from 'class-validator';

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
        forbidUnknownValues: true,
        transform: true,
      })
    )
    .init();
})();
