import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';

import { AdminAOPProvider } from './admin-aop.provider';
import { HostAOPProvider } from './host-aop.provider';
import { BaseAOPProvider } from './provider';
import { UserAOPProvider } from './user-aop.provider';

@Module({
  providers: [UserAOPProvider, BaseAOPProvider],
  imports: [DiscoveryModule],
})
export class AOPModule {}

@Module({
  providers: [AdminAOPProvider, BaseAOPProvider],
  imports: [DiscoveryModule],
})
export class AdminAOPModule {}

@Module({
  providers: [HostAOPProvider, BaseAOPProvider],
  imports: [DiscoveryModule],
})
export class HostAOPModule {}
