import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Modules } from 'modules';
import { ConfigModule } from '@nestjs/config';
import { Filters, Interceptors } from 'utils';

const providers = [...Filters, ...Interceptors];

@Module({
  imports: [
    ...Modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...providers],
})
export class AppModule {}
