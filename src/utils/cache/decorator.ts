import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject } from '@nestjs/common';

import { Cache } from 'cache-manager';

import { AOPDecorator, AOPParams } from '@/interface/aop.interface';
import { CacheOption } from '@/interface/cache.interface';

import { AOP } from '../aop';
import { createAOPDecorator } from '../aop/utils';

export const CREATE_CACHE = Symbol('CREATE_CACHE');
export const DELETE_CACHE = Symbol('DELETE_CACHE');

export const CreateCache = (options: CacheOption) => createAOPDecorator(CREATE_CACHE, options);
export const DeleteCache = (key: string) => createAOPDecorator(DELETE_CACHE, key);

@AOP(CREATE_CACHE)
export class CreateCacheDecorator implements AOPDecorator {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  execute({ method, metadata }: AOPParams<any, CacheOption>) {
    return async (arg1: string, arg2: number) => {
      const originResult = method(arg1, arg2);

      const isCacheExist = await this.cache.get(metadata.key);

      if (isCacheExist) {
        return isCacheExist;
      } else {
        await this.cache.set(metadata.key, originResult, metadata.ttl);
      }

      return originResult;
    };
  }
}
