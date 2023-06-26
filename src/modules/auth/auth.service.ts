import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { Response } from 'express';
import type { SignOptions } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import queryString from 'querystring';
import { AppleLogin, KakaoLogin, NaverLogin } from 'wemacu-nestjs';

import { Encrypt } from '@/common/encrypt';
import type { TokenPayload, TokenPayloadProps } from '@/interface/token.interface';
import type { SocialType } from '@/interface/user.interface';
import { AdminRepository } from '@/modules/admin/admin.repository';
import { HostRepository } from '@/modules/host/host.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

import { CreateAdminDTO } from '../admin/dto/create-admin.dto';
import { CreateHostDTO } from '../host/dto';
import { CreateSocialUserDTO } from '../user/dto';

import { AdminAuthDTO, HostAuthDTO, TokenDTO } from './dto';
import { AuthException } from './exception/auth.exception';
import {
  ALREADY_EXIST_ADMIN,
  ALREADY_EXIST_HOST,
  AUTH_ERROR_CODE,
  NOT_ACCEPTED_ADMIN,
  WRONG_ACCESS_TOKEN,
  WRONG_ID,
  WRONG_KEY,
  WRONG_PASSWORD,
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
    private readonly appleService: AppleLogin,
    private readonly configService: ConfigService
  ) {}

  async testUserLogin() {
    const user = await this.userRepository.findUserByNickname('testUser');

    const tokens = await this.createTokens({ id: user.id, role: 'USER' });
    return tokens;
  }

  async socialCallback(props: CreateSocialUserDTO, socialId: string, path: SocialType, token: string, res: Response) {
    const isExistUser = await this.userRepository.checkUserBySocialId(socialId);

    if (!isExistUser) {
      await this.userRepository.createSocialUser(props);
    }

    const user = await this.userRepository.findUserBySocialId(socialId);
    const tokens = await this.createTokens({ id: user.id, role: 'USER' });

    const query = queryString.stringify({
      status: 200,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      [`${path}Token`]: token,
    });

    res.redirect(`${this.configService.get('CLIENT_URL')}/auth/${path}?${query}`);
  }

  async appleLoginCallback(code: string, res: Response) {
    const result = await this.appleService.getRestCallback(code);
    const user = result;
    this.socialCallback(
      new CreateSocialUserDTO({
        nickname: user.name ?? '',
        socialId: `${user.id}`,
        socialType: 'apple',
        email: user.email ?? undefined,
      }),
      `${user.id}`,
      'apple',
      code,
      res
    );
  }

  async kakaoLoginCallback(code: string, res: Response) {
    const result = await this.kakaoService.getRestCallback(code);
    const { user } = result;
    const account = user.kakaoAccount;

    this.socialCallback(
      new CreateSocialUserDTO({
        nickname: user.properties.nickname ?? '',
        socialId: `${user.id}`,
        socialType: 'kakao',
        birth: account.birthday && account.birthyear && account.birthyear + account.birthday,
        email: account.email,
        gender: account.gender ?? account.gender === 'male' ? 1 : account.gender === 'female' ? 2 : undefined,
        phoneNumber: account.phone_number,
        profileImage: user.properties.profile_image,
      }),
      `${user.id}`,
      'kakao',
      result.token,
      res
    );
  }

  async naverLoginCallback(code: string, res: Response) {
    const result = await this.naverService.getRestCallback(code);
    const { user } = result;

    this.socialCallback(
      new CreateSocialUserDTO({
        nickname: user.name,
        socialId: `${user.id}`,
        socialType: 'naver',
        birth: user.birthday,
        email: user.email,
        gender: user.gender === 'M' ? 1 : user.gender === 'F' ? 2 : undefined,
        phoneNumber: user.mobile,
        profileImage: user.profile_image,
      }),
      `${user.id}`,
      'naver',
      result.token,
      res
    );
  }

  async adminLogin(props: AdminAuthDTO) {
    const admin = await this.adminRepository.findAdminByUserId(props.userId);

    const isMatch = Encrypt.comparePassword(admin.salt, props.password, admin.password);
    if (!isMatch) {
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_PASSWORD));
    }

    if (!admin.isAccepted) {
      throw new AuthException(AUTH_ERROR_CODE.UNAUTHORIZED(NOT_ACCEPTED_ADMIN));
    }

    const token = await this.createTokens({ id: admin.id, role: 'ADMIN' });
    return token;
  }

  async adminRegister(props: CreateAdminDTO) {
    const isExist = await this.adminRepository.checkAdminByUserId(props.userId);
    if (isExist) {
      throw new AuthException(AUTH_ERROR_CODE.CONFLICT(ALREADY_EXIST_ADMIN));
    }

    const admin = await this.adminRepository.createAdmin(props);
    const token = await this.createTokens({ id: admin, role: 'ADMIN' });
    return token;
  }

  async hostLogin(props: HostAuthDTO) {
    const host = await this.hostRepository.findHostByEmail(props.email);

    const isMatch = Encrypt.comparePassword(host.salt, props.password, host.password);
    if (!isMatch) {
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_PASSWORD));
    }

    const token = await this.createTokens({ id: host.id, role: 'HOST' });
    return token;
  }

  async hostRegister(props: CreateHostDTO) {
    const isExist = await this.hostRepository.checkHostByEmail(props.email);

    if (isExist) {
      throw new AuthException(AUTH_ERROR_CODE.CONFLICT(ALREADY_EXIST_HOST));
    }

    const host = await this.hostRepository.createHost(props);
    const token = await this.createTokens({ id: host, role: 'HOST' });
    return token;
  }
  sleep(ms: number) {
    return new Promise((r) => setTimeout(r, ms));
  }
  async refresh(tokens: TokenDTO) {
    const { accessToken, refreshToken } = tokens;
    const accessTokenPayload = this.jwt.verifyJwt<TokenPayload>(accessToken, {
      ignoreExpiration: true,
    }) as TokenPayload | null | undefined;
    const refreshTokenPayload = this.jwt.verifyJwt<TokenPayload>(refreshToken) as TokenPayload | null | undefined;
    await this.sleep(10000);
    if (!accessTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ACCESS_TOKEN));
    if (!refreshTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_REFRESH_TOKEN));

    if (accessTokenPayload.key !== refreshTokenPayload.key)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_KEY));
    if (accessTokenPayload.id !== refreshTokenPayload.id)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ID));

    return this.createTokens({ id: refreshTokenPayload.id, role: refreshTokenPayload.role });
  }

  async createTokens<T extends TokenPayloadProps>(value: T, options?: SignOptions) {
    const key = nanoid();

    const accessToken = this.jwt.signJwt<TokenPayload>({ ...value, key }, { ...options, expiresIn: '2s' });
    const refreshToken = this.jwt.signJwt<TokenPayload>(
      { ...value, key },
      { ...options, expiresIn: this.refreshTokenExpiresIn }
    );

    return new TokenDTO({ accessToken, refreshToken });
  }
}
