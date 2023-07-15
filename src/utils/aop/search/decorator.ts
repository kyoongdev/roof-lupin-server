import { CallHandler, ExecutionContext, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';

import { Request } from 'express';
import { map, Observable } from 'rxjs';

import { AOPDecorator, AOPInterceptorDecorator, AOPParams } from '@/interface/aop.interface';

import { AOP } from '../aop.decorator';
import { createAOPDecorator } from '../utils';

export const RECENT_SEARCH_API = Symbol('RECENT_SEARCH_API');
export const SPACE_SEARCH_API = Symbol('SPACE_SEARCH_API');

export const RecentSearchApi = () => createAOPDecorator(RECENT_SEARCH_API);
export const SpaceSearchApi = () => createAOPDecorator(SPACE_SEARCH_API);

@AOP(RECENT_SEARCH_API)
export class RecentSearchApiDecorator implements AOPDecorator {
  execute({ method, metadata }: AOPParams<any, undefined>) {
    return async (...args: any[]) => {
      const originResult = await method(...args);

      console.log({ method, args, metadata });
      return originResult;
    };
  }
}
