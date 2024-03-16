import { CacheModuleOptions, CacheOptionsFactory } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';

import redisStore from 'cache-manager-redis-store';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  createCacheOptions(): CacheModuleOptions {
    const config: CacheModuleOptions = {
      store: redisStore as any,
      host: 'localhost',
      port: 6379,
      ttl: 600,
      max: 200,
      isGlobal: true,
    };
    return config;
  }
}
