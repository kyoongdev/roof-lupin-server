import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { SignOptions, VerifyOptions } from 'jsonwebtoken';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { nanoid } from 'nanoid';

import { TokenPayload, TokenPayloadProps } from '@/interface/token.interface';
import { TokenDTO } from '@/modules/auth/dto';

@Injectable()
export class Jsonwebtoken {
  private readonly accessTokenExpiresIn = '2h' as const;
  private readonly refreshTokenExpiresIn = '14d' as const;

  constructor(private readonly configService: ConfigService) {}

  signJwt<T extends object>(value: T, options?: SignOptions): string | any {
    try {
      if (typeof value !== 'string' && typeof value !== 'object' && !Buffer.isBuffer(value)) {
        throw { status: 400, message: 'BadRequest Payload' };
      }

      return jwt.sign(value, this.configService.get<string>('JWT_KEY') as string, options ?? {});
    } catch (error) {
      return new JsonWebTokenError('sign Failed');
    }
  }

  verifyJwt<T = any>(token: string, options?: VerifyOptions): T | any {
    try {
      return jwt.verify(token, this.configService.get<string>('JWT_KEY') as string, options ?? {}) as T;
    } catch (error) {
      return new JsonWebTokenError('sign Failed');
    }
  }

  async createTokens<T extends TokenPayloadProps>(value: T, options?: SignOptions) {
    const key = nanoid();

    const accessToken = this.signJwt<TokenPayload>(
      { ...value, key },
      { ...options, expiresIn: this.accessTokenExpiresIn }
    );
    const refreshToken = this.signJwt<TokenPayload>(
      { ...value, key },
      { ...options, expiresIn: this.refreshTokenExpiresIn }
    );

    return new TokenDTO({ accessToken, refreshToken });
  }
}
