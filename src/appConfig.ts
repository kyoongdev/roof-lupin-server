import type { INestApplication, PipeTransform } from '@nestjs/common';
import type { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from 'database/prisma.service';
import { seedDatabase } from 'seed';

class AppConfig {
  private app: INestApplication;

  constructor(app: INestApplication) {
    this.app = app;
  }
  async init() {
    this.configureSwagger();
    await this.configureDatabase();
    await this.app.listen(8000, () => {
      console.log('server start at 8000');
    });
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

  private configureSwagger() {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Roof Server API')
      .setDescription('Roof Server - ~~의 API 문서입니다.')
      .setVersion('0.1')
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

    config.get('NODE_ENV') === 'local' && (await seedDatabase(database));
    await database.enableShutdownHooks(this.app);
  }
}

export default AppConfig;
