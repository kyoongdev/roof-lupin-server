import { CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { applyDecorators, CallHandler, ExecutionContext, Inject, NestInterceptor } from '@nestjs/common';

import { Cache } from 'cache-manager';
import { Observable } from 'rxjs';

interface CacheApiOptions {
  ttl?: number;
  key?: string;
}

const DELETE_CACHE = Symbol('DELETE_CACHE');

export const CacheApi = ({ ttl = 1000 * 60 * 10, key = 'DEFAULT_KEY' }: CacheApiOptions) =>
  applyDecorators(CacheKey(key), CacheTTL(ttl));

export const DeleteCache = (...key: string[]) => {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata(DELETE_CACHE, key, descriptor.value);
    return descriptor;
  };
};

export class DeleteCacheInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const method = context.getHandler();
    const keys: string[] | undefined = Reflect.getMetadata(DELETE_CACHE, method);

    return next.handle();
  }
}
