import { ClassProvider } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { DeleteCacheInterceptor } from '../cache';

export * from './data.interceptor';
export * from './response-with-id.interceptor';
export * from './user-cookie.interceptor';

export const Interceptors: ClassProvider<any>[] = [
  {
    useClass: DeleteCacheInterceptor,
    provide: APP_INTERCEPTOR,
  },
];
