import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';

import AppConfig from '@/appConfig';
import { logger } from '@/log';

import { AppModule } from './app.module';
import { getDayWithWeek } from './common/date';
import { CertifyUserDTO } from './modules/user/dto/certify-user.dto';

(async function () {
  const app = await NestFactory.create(AppModule, {
    logger,
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
})();
