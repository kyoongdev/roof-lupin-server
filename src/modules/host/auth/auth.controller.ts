import { Body, Post } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { HostAuthDTO, TokenDTO } from '@/modules/auth/dto';
import { ApiController } from '@/utils';

import { CreateHostDTO } from '../dto';

import { HostAuthService } from './auth.service';

@ApiController('auth', '[호스트] 로그인/회원가입')
export class HostAuthController {
  constructor(private readonly authService: HostAuthService) {}

  @Post('login')
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

  @Post('register')
  @RequestApi({
    summary: {
      description: '호스트 회원가입',
      summary: '호스트 회원가입을 합니다.',
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
