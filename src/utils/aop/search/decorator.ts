import { Request } from 'express';
import httpContext from 'express-http-context';

import { AOPDecorator, AOPParams } from '@/interface/aop.interface';

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

      return originResult;
    };
  }
}
