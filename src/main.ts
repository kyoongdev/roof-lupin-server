import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import AppConfig from 'appConfig';

(async function () {
  const app = await NestFactory.create(AppModule);
  await new AppConfig(app)
    .enableCors({
      origin: '*',
    })
    .configureMiddleware()
    .configurePipes()
    .init();
})();
