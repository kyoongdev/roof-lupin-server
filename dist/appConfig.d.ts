import type { INestApplication, NestInterceptor, PipeTransform } from '@nestjs/common';
import type { CorsOptions, CorsOptionsDelegate } from '@nestjs/common/interfaces/external/cors-options.interface';
declare class AppConfig {
  private app;
  constructor(app: INestApplication);
  init(): Promise<void>;
  initAlarm(): Promise<void>;
  enableCors(options?: CorsOptions | CorsOptionsDelegate<any>): this;
  configureMiddleware(...middlewares: any[]): this;
  configurePipes(...pipes: PipeTransform<any, any>[]): this;
  configureInterceptors(...interceptors: NestInterceptor[]): this;
  private configureSwagger;
  private configureDatabase;
}
export default AppConfig;
