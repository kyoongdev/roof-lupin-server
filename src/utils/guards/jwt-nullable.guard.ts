import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Admin, Host, User } from '@prisma/client';
import { Request } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';

import { PrismaService } from '@/database/prisma.service';
import type { ReqUserType } from '@/interface/role.interface';
import { Role, type TokenPayload } from '@/interface/token.interface';

import { Jsonwebtoken } from '../jwt';

@Injectable()
export class JwtNullableAuthGuard implements CanActivate {
  private readonly jwt: Jsonwebtoken;
  constructor(private readonly configService: ConfigService, private database: PrismaService) {
    this.jwt = new Jsonwebtoken(this.configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const authorization = req.headers.authorization;

    if (authorization) {
      const splittedHeader = authorization.split(' ');
      if (splittedHeader.length !== 2 && splittedHeader[0] !== 'Bearer') throw new UnauthorizedException();

      const decoded: TokenPayload = this.jwt.verifyJwt<TokenPayload>(splittedHeader[1]);

      if (decoded instanceof JsonWebTokenError) throw new UnauthorizedException('TOKEN_EXPIRED');

      let isExist: User | Host | Admin | null = null;

      if (decoded.role === Role.USER) isExist = await this.database.user.findUnique({ where: { id: decoded.id } });
      else if (decoded.role === Role.HOST) isExist = await this.database.host.findUnique({ where: { id: decoded.id } });
      else if (decoded.role === Role.ADMIN)
        isExist = await this.database.admin.findUnique({ where: { id: decoded.id } });

      if (!isExist) throw new ForbiddenException('AUTHORIZATION_FORBIDDEN');

      req.user = {
        ...isExist,
        role: decoded.role,
      } as ReqUserType;
    }

    return true;
  }
}
