import type { INestApplication, NestInterceptor, PipeTransform } from '@nestjs/common';
import type { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import axios from 'axios';
import scheduler from 'node-schedule';

import { PrismaService } from '@/database/prisma.service';

import { FCMProvider } from './utils/fcm';

class AppConfig {
  private app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }
  async init() {
    this.configureSwagger();

    await this.configureDatabase();

    await this.app.listen(8000, () => {
      console.info('🔥루프루팡 서버 시작!! 8000🔥');
    });
    this.revalidate();
    await this.initAlarm();
  }

  revalidate() {
    const configService = this.app.get(ConfigService);

    if (configService.get('NODE_ENV') === 'dev') {
      axios.get(`${configService.get('CLIENT_REVALIDATE_URL')}?tag=spaces`);
      axios.get(`${configService.get('CLIENT_REVALIDATE_URL')}?tag=home`);
      axios.get(`${configService.get('CLIENT_REVALIDATE_URL')}?tag=rankings`);
      axios.get(`${configService.get('CLIENT_REVALIDATE_URL')}?tag=contents`);
      axios.get(`${configService.get('CLIENT_REVALIDATE_URL')}?tag=rental-types`);
    }
  }

  async initAlarm() {
    const database = this.app.get(PrismaService);
    const fcmProvider = this.app.get(FCMProvider);

    const alarms = await database.userAlarm.findMany({
      where: {
        isPushed: false,
        isRead: false,
      },
      include: {
        user: true,
      },
    });

    await Promise.all(
      alarms.map(async (alarm) => {
        const currentDate = new Date();
        const alarmAt = alarm.alarmAt;

        if (currentDate >= alarmAt) {
          await fcmProvider.sendMessage({
            token: alarm.user.pushToken,
            title: alarm.title,
            body: alarm.content,
          });
          await database.userAlarm.update({
            where: {
              id: alarm.id,
            },
            data: {
              isPushed: true,
            },
          });
        } else {
          scheduler.scheduleJob(alarmAt, async () => {
            await fcmProvider.sendMessage({
              token: alarm.user.pushToken,
              title: alarm.title,
              body: alarm.content,
            });
            await database.userAlarm.update({
              where: {
                id: alarm.id,
              },
              data: {
                isPushed: true,
              },
            });
          });
        }
      })
    );
  }

  enableCors(options?: CorsOptions | CorsOptionsDelegate<any>) {
    this.app.enableCors(options);
    return this;
  }

  configureMiddleware(...middlewares: any[]) {
    middlewares.length > 0 && this.app.use(...middlewares);

    return this;
  }

  configurePipes(...pipes: PipeTransform<any, any>[]) {
    pipes.length > 0 && this.app.useGlobalPipes(...pipes);
    return this;
  }

  configureInterceptors(...interceptors: NestInterceptor[]) {
    interceptors.length > 0 && this.app.useGlobalInterceptors(...interceptors);
    return this;
  }

  private configureSwagger() {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('🖕RoofLupin API🖕')
      .setDescription('RoofLupin 루프루팡의 API 문서입니다.')
      .setContact("RoofLupin's Developer", '', 'dev@cumuco.net')
      .setVersion('1.0.0')
      .addServer('http://localhost:8000')
      .addServer('https://api.rooflupin.com')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          name: 'JWT',
          in: 'header',
        },
        'access-token'
      )
      .build();
    const document = SwaggerModule.createDocument(this.app, swaggerConfig);

    SwaggerModule.setup('api-docs', this.app, document);
  }

  private async configureDatabase() {
    const config = this.app.get(ConfigService);
    const database = this.app.get(PrismaService);

    await database.enableShutdownHooks(this.app);
  }
}

export default AppConfig;
