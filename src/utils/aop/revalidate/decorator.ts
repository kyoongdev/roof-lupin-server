import { ConfigService } from '@nestjs/config';

import axios from 'axios';

import { AOPDecorator, AOPParams } from '@/interface/aop.interface';
import type { RevalidateApiKey, RevalidateClientApi } from '@/interface/revalidate.interface';

import { AOP } from '../aop.decorator';
import { createAOPDecorator } from '../utils';

export const REVALIDATE_API = Symbol('REVALIDATE_API');

export const RevalidateApi = (data: RevalidateClientApi[]) => createAOPDecorator(REVALIDATE_API, data);

@AOP(REVALIDATE_API)
export class RevalidateApiDecorator implements AOPDecorator {
  constructor(private readonly configService: ConfigService) {}

  execute({ method, metadata }: AOPParams<any, RevalidateClientApi[]>) {
    return async (...args: any[]) => {
      const originResult = await method(...args);
      try {
        console.log(metadata);
        await Promise.all(
          metadata.map(async (data) => {
            const path = this.parseTarget(data.key, data.index, ...args);
            await axios.get(`${this.configService.get('CLIENT_REVALIDATE_URL')}${path}`);
          })
        );
        return originResult;
      } catch (err) {
        console.log(err);
        return originResult;
      }
    };
  }

  parseTarget(key: string, index?: number, ...args: any[]) {
    const metaData = key.startsWith('/') ? key : `/${key}`;

    if (index && metaData.includes(':')) {
      const id = args[index] as string;
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
