import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppleLogin, KakaoLogin, NaverLogin } from 'cumuco-nestjs';
import type { Response } from 'express';
import { nanoid } from 'nanoid';
import queryString from 'querystring';

import { MessageEvent } from '@/event/message';
import type { TokenPayload } from '@/interface/token.interface';
import type { SocialType } from '@/interface/user.interface';
import { logger } from '@/log';
import { UserRepository } from '@/modules/user/user.repository';
import { Jsonwebtoken } from '@/utils/jwt';

import { COUPON_CODE } from '../coupon/constants';
import { CouponRepository } from '../coupon/coupon.repository';
import { CreateSocialUserDTO } from '../user/dto';
import { USER_BLOCKED, USER_ERROR_CODE } from '../user/exception/errorCode';
import { UserException } from '../user/exception/user.exception';

import { TokenDTO } from './dto';
import { AuthException } from './exception/auth.exception';
import { AUTH_ERROR_CODE, WRONG_ACCESS_TOKEN, WRONG_ID, WRONG_KEY, WRONG_REFRESH_TOKEN } from './exception/errorCode';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwt: Jsonwebtoken,
    private readonly couponRepository: CouponRepository,
    private readonly kakaoService: KakaoLogin,
    private readonly naverService: NaverLogin,
    private readonly appleService: AppleLogin,
    private readonly configService: ConfigService,
    private readonly messageEvent: MessageEvent
  ) {}

  async testUserLogin() {
    const user = await this.userRepository.findUserByNickname('user2');

    const tokens = await this.jwt.createTokens({ id: user.id, role: 'USER' });
    return tokens;
  }

  async registerNewUserCoupon(userId: string) {
    const coupon = await this.couponRepository.findCouponByCode(COUPON_CODE.REGISTER);
    const usageDateStartAt = new Date();
    usageDateStartAt.setUTCHours(0, 0, 0, 0);
    const current = new Date();
    current.setUTCHours(0, 0, 0, 0);
    const usageDateEndAt = new Date(current.setUTCDate(current.getUTCDate() + coupon.defaultDueDay));
    const user = await this.userRepository.findUser(userId);
    this.messageEvent.createCouponDurationAlarm({
      dueDate: usageDateEndAt,
      userId,
      jobId: nanoid(),
      nickname: user.nickname,
    });

    await this.couponRepository.createUserCoupon(coupon.id, {
      userId,
      usageDateEndAt,
      usageDateStartAt,
    });
  }

  async socialCallback(props: CreateSocialUserDTO, socialId: string, path: SocialType, token: string, res: Response) {
    const isExistUser = await this.userRepository.checkUserBySocialId(socialId);

    if (!isExistUser) {
      const userId = await this.userRepository.createSocialUser(props);
      await this.registerNewUserCoupon(userId);
    }

    const user = await this.userRepository.findUserBySocialId(socialId);
    await this.userRepository.login(user.id);

    const currentDate = new Date();
    if (user.isBlocked && user.unBlockAt.getTime() > currentDate.getTime()) {
      throw new UserException(USER_ERROR_CODE.FORBIDDEN(USER_BLOCKED));
    }

    const tokens = await this.jwt.createTokens({ id: user.id, role: 'USER' });

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
        name: user.name ?? undefined,
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
  async getKakaoUser(token: string) {
    const socialUser = await KakaoLogin.getUser(token);

    const isExistUser = await this.userRepository.checkUserBySocialId(`${Number(socialUser.id)}`);
    if (isExistUser) {
      const tokens = await this.jwt.createTokens({ id: isExistUser.id, role: 'USER' });
      return tokens;
    }

    const newUserId = await this.userRepository.createSocialUser(new CreateSocialUserDTO().setKakaoUser(socialUser));
    await this.registerNewUserCoupon(newUserId);

    return await this.jwt.createTokens({ id: newUserId, role: 'USER' });
  }

  async kakaoLoginCallback(code: string, res: Response) {
    try {
      const result = await this.kakaoService.getRestCallback(code);

      const { user } = result;

      this.socialCallback(new CreateSocialUserDTO().setKakaoUser(user), `${user.id}`, 'kakao', result.token, res);
    } catch (err) {
      logger.log(err);
    }
  }

  async naverLoginCallback(code: string, res: Response) {
    const result = await this.naverService.getRestCallback(code);
    const { user } = result;

    this.socialCallback(new CreateSocialUserDTO().setNaverUser(user), `${user.id}`, 'naver', result.token, res);
  }

  async refresh(tokens: TokenDTO) {
    const { accessToken, refreshToken } = tokens;
    const accessTokenPayload = this.jwt.verifyJwt<TokenPayload>(accessToken, {
      ignoreExpiration: true,
    }) as TokenPayload | null | undefined;
    const refreshTokenPayload = this.jwt.verifyJwt<TokenPayload>(refreshToken) as TokenPayload | null | undefined;

    if (!accessTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ACCESS_TOKEN));
    if (!refreshTokenPayload) throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_REFRESH_TOKEN));

    if (accessTokenPayload.key !== refreshTokenPayload.key)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_KEY));
    if (accessTokenPayload.id !== refreshTokenPayload.id)
      throw new AuthException(AUTH_ERROR_CODE.BAD_REQUEST(WRONG_ID));

    return this.jwt.createTokens({ id: refreshTokenPayload.id, role: refreshTokenPayload.role });
  }
}
