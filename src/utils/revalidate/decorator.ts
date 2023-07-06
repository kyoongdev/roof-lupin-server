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
      const path = this.parseTarget(metadata, ...args);

      try {
        await axios.get(`${this.configService.get('CLIENT_URL')}${path}`);

        return originResult;
      } catch (err) {
        return originResult;
      }
    };
  }

  parseTarget(key: string, ...args: any[]) {
    const metaData = key.startsWith('/') ? key : `/${key}`;
    const id = args.find((arg) => typeof arg === 'string');

    if (id && metaData.includes(':')) {
      const path = metaData.split('/').reduce<string>((acc, next, index) => {
        if (next.includes(':')) {
          acc += `/${id}`;
        } else {
          acc += index === 0 ? next : `/${next}`;
        }
        return acc;
      }, '');
      return path;
    } else {
      return key;
    }
  }
}
