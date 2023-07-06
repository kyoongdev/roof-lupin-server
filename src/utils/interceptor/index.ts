import { ClassProvider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { CreateCacheDecorator, DeleteCacheDecorator } from '../cache';
import { RevalidateApiDecorator } from '../revalidate';

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
];
