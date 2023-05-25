import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { Admin, Host, User } from '@prisma/client';
import { JsonWebTokenError } from 'jsonwebtoken';

import { PrismaService } from '@/database/prisma.service';
import { Role, TokenPayload } from '@/interface/token.interface';

import { Jsonwebtoken } from '../jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly jwt: Jsonwebtoken;
  constructor(private readonly configService: ConfigService, private database: PrismaService) {
    this.jwt = new Jsonwebtoken(this.configService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const authorization = req.headers.authorization;

    if (!authorization) throw new UnauthorizedException('토큰이 없습니다.');

    const splittedHeader = authorization.split(' ');
    if (splittedHeader.length !== 2 && splittedHeader[0] !== 'Bearer') throw new UnauthorizedException();

    const decoded = this.jwt.verifyJwt<TokenPayload>(splittedHeader[1]);

    if (decoded instanceof JsonWebTokenError) throw new UnauthorizedException('TOKEN_EXPIRED');

    let isExist: User | Host | Admin | null = null;

    if (decoded.userType === Role.USER) isExist = await this.database.user.findUnique({ where: { id: decoded.id } });
    else if (decoded.userType === Role.HOST)
      isExist = await this.database.host.findUnique({ where: { id: decoded.id } });
    else if (decoded.userType === Role.ADMIN)
      isExist = await this.database.admin.findUnique({ where: { id: decoded.id } });

    if (!isExist) throw new ForbiddenException('권한이 없습니다.');

    req.user = {
      ...isExist,
      userType: decoded.userType,
    };

    return true;
  }
}
