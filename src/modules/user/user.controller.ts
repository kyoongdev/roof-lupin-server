import { Body, Get, Param, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleInterceptorAPI } from '@/utils/interceptor/role.interceptor';

import { CreateUserDTO } from './dto';
import { CommonUserDTO } from './dto/common-user.dto';
import { UserService } from './user.service';

@ApiController('users', '유저')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('ADMIN'))
  @RequestApi({
    summary: {
      description: '유저 목록',
      summary: '유저 목록 불러오기 - 로그인 필요, 관리자만 사용 가능',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: CommonUserDTO,
    isPaging: true,
  })
  async getUsers(@Paging() paging: PagingDTO) {
    return await this.userService.findPagingUser(paging);
  }

  @Get(':userId/detail')
  @RequestApi({
    summary: {
      description: '유저 상세 정보',
      summary: '유저 상세 정보 불러오기',
    },
    params: {
      name: 'userId',
      type: 'string',
      description: '유저 아이디',
    },
  })
  @ResponseApi({
    type: CommonUserDTO,
  })
  async getUser(@Param('userId') userId: string) {
    return await this.userService.findUser(userId);
  }

  @Get('me')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('USER'))
  @RequestApi({
    summary: {
      description: '내 정보',
      summary: '내 정보 불러오기 - 로그인 필요, 유저만 사용 가능',
    },
  })
  @ResponseApi({
    type: CommonUserDTO,
  })
  async getMe(@ReqUser() user: RequestUser) {
    return await this.userService.findUser(user.id);
  }

  @Post('')
  @RequestApi({
    body: {
      type: CreateUserDTO,
    },
  })
  @ResponseApi({})
  createUser(@Body() body: CreateUserDTO) {
    return [];
  }
}
