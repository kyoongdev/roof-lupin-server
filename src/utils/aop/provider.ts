import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { AOPMetaData } from '@/interface/aop.interface';

import { AOP_KEY } from './aop.decorator';
import { AOPPrefix } from './utils';

@Injectable()
export class AOPProvider implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,
    private readonly reflect: Reflector
  ) {}

  onModuleInit() {
    this.getInstance();
  }
  getInstance(): void {
    const providers = this.discovery.getProviders();
    const controllers = this.discovery.getControllers();

    const singletonInstances = providers
      .concat(controllers)
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      .filter((wrapper) => wrapper.isDependencyTreeStatic());

    const aopDecorators = this.getAopDecorators(providers);

    singletonInstances.forEach(({ instance }) => {
      const methodNames = this.scanner.getAllMethodNames(instance);
      methodNames
        .filter((methodName) => Boolean(instance[methodName]))
        .filter((methodName) => instance[methodName].name.includes(AOPPrefix))
        .forEach((methodName) => {
          aopDecorators.forEach((aopInstance) => {
            const metadataKey = this.reflect.get(AOP_KEY, aopInstance.constructor);
            const metadataList: AOPMetaData[] = this.reflect.get(metadataKey, instance[methodName]);
            if (!metadataList) {
              return;
            }
            for (const { originalFn, metadata, aopSymbol } of metadataList) {
              const wrappedMethod = aopInstance.wrap({
                instance,
                methodName,
                method: originalFn.bind(instance),
                metadata,
              });

              Object.setPrototypeOf(wrappedMethod, instance[methodName]);

              instance[aopSymbol] ??= {};
              instance[aopSymbol][methodName] = wrappedMethod;
            }
          });
        });
    });
  }

  getAopDecorators(providers: InstanceWrapper<any>[]) {
    return providers
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance, metatype }) => {
        if (!instance || !metatype) {
          return false;
        }
        const aspect = this.reflect.get<string>(AOP_KEY, metatype);
        if (!aspect) {
          return false;
        }
        return typeof instance.wrap === 'function';
      })
      .map(({ instance }) => instance);
  }
}
