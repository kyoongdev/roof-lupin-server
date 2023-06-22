import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserAgent = createParamDecorator(async (_: any, ctx: ExecutionContext) => {
  const request = await ctx.switchToHttp().getRequest();

  return request.headers['user-agent'];
});
