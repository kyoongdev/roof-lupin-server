import { CacheModule } from '@nestjs/cache-manager';
import { Module, type Provider, Type } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscoveryService, MetadataScanner, RouterModule, Routes } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { Modules, V1Module } from '@/modules';
import { Filters, Interceptors } from '@/utils';

import { AppController } from './app.controller';
import { FCMProvider } from './common/fcm';
import { EventProviders } from './event';
import { FCMEvent } from './event/fcm';
import { SchedulerEvent } from './event/scheduler';
import { AdminModule } from './modules/admin/admin.module';
import { GlobalModule } from './modules/global';
import { HostModule } from './modules/host/host.module';
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
    GlobalModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot({
      global: true,
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    V1Module,
    AdminModule,
    HostModule,
    RouterModule.register([
      {
        path: '/api/v1',
        module: V1Module,
        children: [...Modules, { path: '/admins', module: AdminModule }, { path: '/hosts', module: HostModule }],
      },
    ] as Routes),
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
