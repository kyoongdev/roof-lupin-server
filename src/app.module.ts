import { CacheModule } from '@nestjs/cache-manager';
import { Module, type Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { Modules } from '@/modules';
import { Filters, Interceptors } from '@/utils';

import { AppController } from './app.controller';
import { FCMProvider } from './common/fcm';
import { EventProviders } from './event';
import { FCMEvent } from './event/fcm';
import { SchedulerEvent } from './event/scheduler';
import { AOPProvider } from './utils/aop';

const providers: Provider[] = [
  ...Filters,
  ...Interceptors,
  ...EventProviders,
  DiscoveryService,
  MetadataScanner,
  AOPProvider,
  FCMProvider,
  SchedulerEvent,
  FCMEvent,
];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ...Modules,
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
