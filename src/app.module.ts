import { CacheModule } from '@nestjs/cache-manager';
import { Module, type Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DiscoveryService, MetadataScanner, Routes } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';

import { RouterModule } from 'nest-router';

import { Modules, V1Module } from '@/modules';
import { Filters, Interceptors } from '@/utils';

import { AppController } from './app.controller';
import { EventProviders } from './event';
import { AdminModule, AdminModules } from './modules/admin/admin.module';
import { GlobalModule } from './modules/global';
import { HostModule, HostModules } from './modules/host/host.module';
import { AOPModule } from './utils/aop/aop.module';
import { MessageProvider } from './utils/fcm';
import { DynamicLinkProvider } from './utils/link';

const providers: Provider[] = [...Filters, ...Interceptors, ...EventProviders, MessageProvider, DynamicLinkProvider];

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
    RouterModule.forRoutes([
      {
        path: '/api/v1',
        module: V1Module,
        children: Modules,
      },
      {
        path: '/api/v1/admins',
        module: AdminModule,
        children: AdminModules,
      },
      {
        path: '/api/v1/hosts',
        module: HostModule,
        children: HostModules,
      },
    ] as Routes),
  ],
  controllers: [AppController],
  providers,
})
export class AppModule {}
