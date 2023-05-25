import { Injectable } from '@nestjs/common';

import type { Response } from 'express';
import type { SignOptions } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { KakaoLogin } from 'wemacu-nestjs';

import type { TokenPayload, TokenPayloadProps } from '@/interface/token.interface';
import { AdminRepository } from '@/modules/admin/admin.repository';
import { HostRepository } from '@/modules/host/host.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

import { TokenDTO } from './dto';
import { AuthException } from './exception/auth.exception';
import { AUTH_ERROR_CODE, WRONG_ACCESS_TOKEN, WRONG_ID, WRONG_KEY, WRONG_REFRESH_TOKEN } from './exception/errorCode';

@Injectable()
export class AuthService {
  private readonly accessTokenExpiresIn = '2h' as const;
  private readonly refreshTokenExpiresIn = '14d' as const;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository,
    private readonly hostRepository: HostRepository,
    private readonly jwt: Jsonwebtoken,
    private readonly kakaoService: KakaoLogin
  ) {}

  async kakaoLoginCallback(code: string, res: Response) {
    const result = await this.kakaoService.getRestCallback(code);

    //TODO: social 연동을 어떤 방식으로 할 것인지
    // const user = await this.userRepository.findUserByUserId(result.id);
    // res.redirect('http://localhost:3000');
  }

  async adminLogin(email: string, password: string) {
    const admin = await this.adminRepository.findAdminByUserId(email);
    //TODO: password check logic
    // const isMatch = await admin.comparePassword(password);
    // if (!isMatch) {
    //   return null;
    // }
    const token = await this.createTokens({ id: admin.id, role: 'ADMIN' });
    return token;
  }

  async adminRegister(email: string, password: string) {
    // const admin = await this.adminRepository.createAdmin(email, password);
    // const token = await this.createTokens({ id: admin.id, role: 'ADMIN' });
    // return token;
  }

  // async hostLogin() {

  // }

  async refresh(tokens: TokenDTO) {
    const { accessToken, refreshToken } = tokens;
    const accessTokenPayload = this.jwt.verifyJwt<TokenPayload>(accessToken, {
      ignoreExpiration: true,
    });
    const refreshTokenPayload = this.jwt.verifyJwt<TokenPayload>(refreshToken);

    if (!accessTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ACCESS_TOKEN));
    if (!refreshTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_REFRESH_TOKEN));

    if (accessTokenPayload.key !== refreshTokenPayload.key)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_KEY));
    if (accessTokenPayload.id !== refreshTokenPayload.id)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ID));

    return this.createTokens(refreshTokenPayload.id, refreshTokenPayload.userType);
  }

  async createTokens<T extends TokenPayloadProps>(value: T, options?: SignOptions) {
    const key = nanoid();
    const accessToken = this.jwt.signJwt<TokenPayload>(
      { ...value, key },
      { ...options, expiresIn: this.accessTokenExpiresIn }
    );
    const refreshToken = this.jwt.signJwt<TokenPayload>(
      { ...value, key },
      { ...options, expiresIn: this.refreshTokenExpiresIn }
    );

    return new TokenDTO({ accessToken, refreshToken });
  }
}
