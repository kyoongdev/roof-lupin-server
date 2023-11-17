import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { AOPMetaData } from '@/interface/aop.interface';

import { AOP_KEY } from './aop.decorator';
@Injectable()
export class BaseAOPProvider {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,
    private readonly reflect: Reflector
  ) {}

  getInstance(providerFilter: (provider: InstanceWrapper<any>) => boolean): void {
    const providers = this.discovery.getProviders().filter(providerFilter);
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
        .forEach((methodName) => {
          aopDecorators.forEach((aopInstance) => {
            const metadataKey = this.reflect.get(AOP_KEY, aopInstance.constructor);
            const metadataList: AOPMetaData[] = this.reflect.get(metadataKey, instance[methodName]);

            if (!metadataList) {
              return;
            }
            for (const { originalFn, metadata, aopSymbol } of metadataList) {
              const wrappedMethod = aopInstance.execute({
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

        return typeof instance.execute === 'function';
      })
      .map(({ instance }) => instance);
  }
}
