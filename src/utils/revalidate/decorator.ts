import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import { AOPDecorator, AOPParams } from '@/interface/aop.interface';
import type { RevalidateApiKey } from '@/interface/revalidate.interface';

import { AOP } from '../aop';
import { createAOPDecorator } from '../aop/utils';

export const REVALIDATE_API = Symbol('REVALIDATE_API');

export const RevalidateApi = (key: RevalidateApiKey) => createAOPDecorator(REVALIDATE_API, key);

@AOP(REVALIDATE_API)
export class RevalidateApiDecorator implements AOPDecorator {
  constructor(private readonly configService: ConfigService) {}

  execute({ method, metadata }: AOPParams<any, RevalidateApiKey>) {
    return async (...args: any[]) => {
      const originResult = await method(...args);
      try {
        await axios.get(
          `${this.configService.get('CLIENT_URL')}${metadata.startsWith('/') ? metadata : `/${metadata}`}`
        );

        return originResult;
      } catch (err) {
        return originResult;
      }
    };
  }
}
