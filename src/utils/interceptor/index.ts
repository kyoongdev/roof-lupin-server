import { ClassProvider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { RevalidateApiDecorator } from '../aop/revalidate';
import { RecentSearchApiDecorator } from '../aop/search/decorator';
import { CreateCacheDecorator, DeleteCacheDecorator } from '../cache';

export * from './data.interceptor';
export * from './response-with-id.interceptor';
export * from './user-cookie.interceptor';

export const Interceptors: ClassProvider<any>[] = [
  {
    useClass: CreateCacheDecorator,
    provide: APP_INTERCEPTOR,
  },
  {
    useClass: DeleteCacheDecorator,
    provide: APP_INTERCEPTOR,
  },
  {
    useClass: RevalidateApiDecorator,
    provide: APP_INTERCEPTOR,
  },
  {
    useClass: RecentSearchApiDecorator,
    provide: APP_INTERCEPTOR,
  },
];
