import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Response } from 'express';
import type { SignOptions } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import queryString from 'querystring';
import { KakaoLogin, NaverLogin } from 'wemacu-nestjs';

import type { TokenPayload, TokenPayloadProps } from '@/interface/token.interface';
import type { SocialType } from '@/interface/user.interface';
import { AdminRepository } from '@/modules/admin/admin.repository';
import { HostRepository } from '@/modules/host/host.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

import { TokenDTO } from './dto';
import { AuthException } from './exception/auth.exception';
import {
  ALREADY_EXIST_USER,
  AUTH_ERROR_CODE,
  SOCIAL_USER_ERROR,
  WRONG_ACCESS_TOKEN,
  WRONG_ID,
  WRONG_KEY,
  WRONG_REFRESH_TOKEN,
} from './exception/errorCode';

@Injectable()
export class AuthService {
  private readonly accessTokenExpiresIn = '2h' as const;
  private readonly refreshTokenExpiresIn = '14d' as const;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly adminRepository: AdminRepository,
    private readonly hostRepository: HostRepository,
    private readonly jwt: Jsonwebtoken,
    private readonly kakaoService: KakaoLogin,
    private readonly naverService: NaverLogin,
    private readonly configService: ConfigService
  ) {}

  async socialCallback(socialId: string, path: SocialType, token: string, res: Response) {
    const isExistUser = await this.userRepository.checkUserByPhoneNumber(socialId);

    if (!isExistUser) {
      // await this.userRepository.createUser()
    }

    const { accessToken, refreshToken } = await this.createTokens({ id: isExistUser.id, role: 'USER' });
    const query = queryString.stringify({
      status: 200,
      accessToken,
      refreshToken,
    });

    res.redirect(`${this.configService.get('CLIENT_URL')}/auth/${path}?${query}`);
  }

  async kakaoLoginCallback(code: string, res: Response) {
    const result = await this.kakaoService.getRestCallback(code);

    this.socialCallback(result.user.id, 'kakao', result.token, res);
  }

  async naverLoginCallback(code: string, res: Response) {
    const result = await this.naverService.getRestCallback(code);

    this.socialCallback(result.user.id, 'naver', result.token, res);
  }

  async naverUser(code: string) {
    const naverUser = await NaverLogin.getUser(code);
    if (!naverUser) {
      throw new AuthException(AUTH_ERROR_CODE.INTERNAL_SERVER_ERROR(SOCIAL_USER_ERROR));
    }

    const isExist = await this.userRepository.checkUserBySocialId(naverUser.id);

    if (isExist) {
      throw new AuthException(AUTH_ERROR_CODE.CONFLICT(ALREADY_EXIST_USER));
    }

    // const newUser = await this.userRepository.createUser()

    // return
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
