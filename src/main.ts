import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

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
    .configureInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
    .configurePipes(
      new ValidationPipe({
        whitelist: true,
        forbidUnknownValues: true,
        transform: true,
      })
    )
    .init();

  console.log(new Date(2023, 9, 2, 14));
})();
