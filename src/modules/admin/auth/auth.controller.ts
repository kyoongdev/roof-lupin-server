import { Body, Post } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { AdminAuthDTO, TokenDTO } from '@/modules/auth/dto';
import { ApiController } from '@/utils';

import { CreateAdminDTO } from '../dto';

import { AdminAuthService } from './auth.service';

@ApiController('auth', '[관리자] 로그인/회원가입')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @Post('login')
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

  @Post('register')
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
