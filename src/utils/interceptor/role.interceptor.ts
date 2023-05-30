import { CallHandler, ExecutionContext, mixin, NestInterceptor, UnauthorizedException } from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';

import { Role, type RoleType } from '@/interface/token.interface';

export const RoleInterceptorAPI = (role?: RoleType, nullable = false) => {
  class RoleInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest<Request>();

      if (!req.user && !nullable) throw new UnauthorizedException('로그인을 진행해주세요.');

      if (role && !nullable) {
        if (role === Role.ADMIN) {
          if (req.user.role !== Role.ADMIN) throw new UnauthorizedException('관리자 권한이 없습니다.');
        } else if (role === Role.HOST) {
          if (req.user.role !== Role.HOST) throw new UnauthorizedException('호스트 권한이 없습니다.');
        } else if (role === Role.USER) {
          if (req.user.role !== Role.USER) throw new UnauthorizedException('유저 권한이 없습니다.');
        }
      }

      return next.handle();
    }
  }
  return mixin<RoleInterceptor>(RoleInterceptor);
};
