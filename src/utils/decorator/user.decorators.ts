import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ReqUserType } from 'interface/role.interface';

export const ReqUser = createParamDecorator(
  async <T extends ReqUserType>(data: any, ctx: ExecutionContext): Promise<T> => {
    const request = await ctx.switchToHttp().getRequest();

    return request.user as T;
  }
);
