import { Body, Get, Post, Query, Response } from '@nestjs/common';

import type { Response as ResponseType } from 'express';
import { nanoid } from 'nanoid';
import { AppleLogin, KakaoLogin, NaverLogin, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ApiController } from '@/utils';

import { CreateAdminDTO } from '../admin/dto/create-admin.dto';
import { CreateHostDTO } from '../host/dto';

import { AuthService } from './auth.service';
import { AdminAuthDTO, AppleLoginCallbackDTO, HostAuthDTO, TokenDTO } from './dto';
import { KakaoSocialUserQuery } from './dto/query';

@ApiController('auth', '로그인/회원가입')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly kakaoService: KakaoLogin,
    private readonly naverService: NaverLogin,
    private readonly appleService: AppleLogin
  ) {}

  @Get('test')
  @RequestApi({
    summary: {
      description: '테스트 로그인',
      summary: '테스트 로그인입니다. 개발 환경에서만 사용이 가능합니다.',
    },
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async test() {
    return await this.authService.testUserLogin();
  }

  @Get('social/kakao')
  @RequestApi({
    summary: {
      description: '카카오 로그인',
      summary: '카카오 로그인',
    },
  })
  @ResponseApi({})
  kakaoLogin(@Response() res: ResponseType) {
    this.kakaoService.getRest(res);
  }

  @Get('social/kakao/callback')
  @RequestApi({})
  @ResponseApi({})
  async kakaoLoginCallback(@Query('code') code: string, @Response() res: ResponseType) {
    await this.authService.kakaoLoginCallback(code, res);
  }

  @Get('social/kakao/user')
  @RequestApi({})
  @ResponseApi({
    type: TokenDTO,
  })
  async getKakaoUser(@Query() query: KakaoSocialUserQuery) {
    return await this.authService.getKakaoUser(query.token);
  }

  @Get('social/naver')
  @RequestApi({
    summary: {
      description: '네이버 로그인',
      summary: '네이버 로그인',
    },
  })
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
  @Get('social/apple')
  @RequestApi({
    summary: {
      description: '애플 로그인',
      summary: '애플 로그인',
    },
  })
  @ResponseApi({})
  appleLogin(@Response() res: ResponseType) {
    this.appleService.getRest(res);
  }

  @Post('social/apple/callback')
  @RequestApi({})
  @ResponseApi({})
  async appleLoginCallback(@Body() body: AppleLoginCallbackDTO, @Response() res: ResponseType) {
    await this.authService.appleLoginCallback(body.id_token, res);
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

  @Post('admin/register')
  @RequestApi({
    summary: {
      description: '관리자 회원가입',
      summary: '관리자 회원가입을 합니다.',
    },
    body: {
      type: CreateAdminDTO,
    },
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async adminRegister(@Body() body: CreateAdminDTO) {
    return await this.authService.adminRegister(body);
  }
  @Post('host/login')
  @RequestApi({
    summary: {
      description: '호스트 로그인',
      summary: '호스트 로그인을 합니다.',
    },
    body: {
      type: HostAuthDTO,
    },
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async hostLogin(@Body() body: HostAuthDTO) {
    return await this.authService.hostLogin(body);
  }

  @Post('host/register')
  @RequestApi({
    summary: {
      description: '호스트 회원가입',
      summary: '호스트 회원가입을 합니다.',
    },
    body: {
      type: CreateHostDTO,
    },
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async hostRegister(@Body() body: CreateHostDTO) {
    return await this.authService.hostRegister(body);
  }

  @Post('refresh')
  @RequestApi({
    summary: {
      description: '토큰 리프레시',
      summary: 'access token과 refresh token을 통해 토큰을 재발급합니다.',
    },
    body: {
      type: TokenDTO,
    },
  })
  @ResponseApi({
    type: TokenDTO,
  })
  async refreshToken(@Body() body: TokenDTO) {
    return await this.authService.refresh(body);
  }
}
