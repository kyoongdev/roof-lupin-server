import { CacheModule } from '@nestjs/cache-manager';
import { Module, type Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscoveryService, MetadataScanner } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { Modules } from '@/modules';
import { Filters, Interceptors } from '@/utils';

import { AppController } from './app.controller';
import { EventProviders } from './event';
import { AOPProvider } from './utils/aop';

const providers: Provider[] = [
  ...Filters,
  ...Interceptors,
  ...EventProviders,
  DiscoveryService,
  MetadataScanner,
  AOPProvider,
];

@Module({
  imports: [
    ...Modules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
