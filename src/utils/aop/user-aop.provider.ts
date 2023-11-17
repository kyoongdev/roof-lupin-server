import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, ModuleRef, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { AOPMetaData } from '@/interface/aop.interface';

import { AOP_KEY } from './aop.decorator';
import { BaseAOPProvider } from './provider';

@Injectable()
export class UserAOPProvider implements OnModuleInit {
  constructor(private readonly aopProvider: BaseAOPProvider) {}

  onModuleInit() {
    this.aopProvider.getInstance(
      (provider) => !String(provider.name).startsWith('Admin') && !String(provider.name).startsWith('Host')
    );
  }
}
