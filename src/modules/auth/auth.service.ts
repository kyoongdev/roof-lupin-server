import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import axios from 'axios';
import type { Response } from 'express';
import type { SignOptions } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import queryString from 'querystring';
import { type KakaoGetRestCallback, KakaoLogin, type NaverGetRestCallback, NaverLogin } from 'wemacu-nestjs';

import type { TokenPayload, TokenPayloadProps } from '@/interface/token.interface';
import type { SocialType } from '@/interface/user.interface';
import { AdminRepository } from '@/modules/admin/admin.repository';
import { HostRepository } from '@/modules/host/host.repository';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

import { CreateAdminDTO } from '../admin/dto/create-admin.dto';
import { CreateSocialUserDTO } from '../user/dto';

import { AdminAuthDTO, TokenDTO } from './dto';
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
    private readonly kakaoService: KakaoLogin,
    private readonly naverService: NaverLogin,
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

    const tokens = await this.createTokens({ id: isExistUser.id, role: 'USER' });

    const query = queryString.stringify({
      status: 200,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    res.redirect(`${this.configService.get('CLIENT_URL')}/auth/${path}?${query}`);
  }

  async kakaoLoginCallback(code: string, res: Response) {
    const result = await this.kakaoService.getRestCallback(code);
    const { user } = result;

    this.socialCallback(
      new CreateSocialUserDTO({
        nickname: user.properties.nickname ?? '',
        socialId: user.id,
        socialType: 'kakao',
        birth: user.kakaoAccount.birthday,
        email: user.kakaoAccount.email,
        gender: user.kakaoAccount.gender ?? user.kakaoAccount.gender === 'male' ? 1 : 2,
        name: user.kakaoAccount.name,
        phoneNumber: user.kakaoAccount.phone_number,
        profileImage: user.properties.profile_image,
      }),
      user.id,
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
        socialId: user.id,
        socialType: 'naver',
        birth: user.birthday,
        email: user.email,
        gender: user.gender === 'M' ? 1 : 2,
        name: user.name,
        phoneNumber: user.mobile,
        profileImage: user.profile_image,
      }),
      user.id,
      'naver',
      result.token,
      res
    );
  }

  async adminLogin(props: AdminAuthDTO) {
    const admin = await this.adminRepository.findAdminByUserId(props.userId);
    const isMatch = await props.comparePassword(admin.password);
    if (!isMatch) {
      return null;
    }
    const token = await this.createTokens({ id: admin.id, role: 'ADMIN' });
    return token;
  }

  async adminRegister(props: CreateAdminDTO) {
    const admin = await this.adminRepository.createAdmin(props);
    const token = await this.createTokens({ id: admin, role: 'ADMIN' });
    return token;
  }

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
    console.log({ accessToken, refreshToken });

    return new TokenDTO({ accessToken, refreshToken });
  }
}
