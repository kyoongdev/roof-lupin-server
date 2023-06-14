import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';

import { CACHE_DECORATOR } from './decorator';

@Injectable()
export class CacheDecoratorProvider implements OnModuleInit {
  constructor(
    private readonly discovery: DiscoveryService,
    private readonly scanner: MetadataScanner,
    private readonly reflect: Reflector
  ) {}

  onModuleInit() {
    this.getInstance();
  }
  getInstance(): void {
    this.discovery
      .getControllers()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())
      .filter(({ instance }) => instance && Object.getPrototypeOf(instance))
      // MetadataScanner로 decorator의 instance에 대한 metadata를 가져옵니다.
      .forEach(({ instance }) => {
        const methodNames = this.scanner.getAllMethodNames(instance);

        methodNames.forEach((methodName) => {
          const testData = Reflect.getMetadata(CACHE_DECORATOR, instance[methodName]);

          if (!testData) {
            return;
          }
          console.log({ testData });
        });
      });
  }
}
