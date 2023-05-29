import { Body, Get, Post, Query, Response } from '@nestjs/common';

import type { Response as ResponseType } from 'express';
import { nanoid } from 'nanoid';
import { KakaoLogin, NaverLogin, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

import { AuthService } from './auth.service';
import { AdminAuthDTO, TokenDTO } from './dto';

@ApiController('auth', '로그인/회원가입')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly kakaoService: KakaoLogin,
    private readonly naverService: NaverLogin
  ) {}

  @Get('social/kakao')
  @RequestApi({})
  @ResponseApi({})
  kakaoLogin(@Response() res: ResponseType) {
    this.kakaoService.getRest(res);
  }

  @Get('social/kakao/callback')
  @RequestApi({})
  @ResponseApi({})
  async kakaoLoginCallback(@Query('code') code: string, @Response() res: ResponseType) {
    await this.authService.kakaoLoginCallback(code, res);
    return { hello: 'hello' };
  }

  @Get('social/naver')
  @RequestApi({})
  @ResponseApi({})
  naverLogin(@Response() res: ResponseType) {
    const code = nanoid(5);
    this.naverService.getRest(res, code);
  }

  @Get('social/naver/callback')
  @RequestApi({})
  @ResponseApi({})
  async naverLoginCallback(@Query('code') code: string, @Response() res: ResponseType) {
    await this.authService.naverLoginCallback(code, res);
  }

  @Post('refresh')
  @RequestApi({
    summary: {
      description: '토큰 재발급',
      summary: 'accessToken과 refreshToken을 통해 토큰을 재발급합니다.',
    },
    body: {
      type: TokenDTO,
    },
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async refresh(@Body() body: TokenDTO) {
    return await this.authService.refresh(body);
  }

  @Post('admin/login')
  @RequestApi({
    summary: {
      description: '관리자 로그인',
      summary: '관리자 로그인을 합니다.',
    },
    body: {
      type: AdminAuthDTO,
    },
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async adminLogin(@Body() body: AdminAuthDTO) {
    return await this.authService.adminLogin(body);
  }
}
