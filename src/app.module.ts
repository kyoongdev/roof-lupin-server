import { ClassSerializerInterceptor, Module, type Provider, UseInterceptors } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { Modules } from '@/modules';
import { Filters, Interceptors } from '@/utils';

import { AppController } from './app.controller';
import { EventProviders } from './event';

const providers: Provider[] = [...Filters, ...Interceptors, ...EventProviders];

@Module({
  imports: [
    ...Modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
