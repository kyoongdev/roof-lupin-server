import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithId } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleInterceptorAPI } from '@/utils/interceptor/role.interceptor';

import { CreateUserDTO, UpdateUserDTO } from './dto';
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
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('ADMIN'))
  @RequestApi({
    summary: {
      description: '유저 생성',
      summary: '유저 생성하기 - 로그인 필요, 관리자만 사용 가능',
    },
    body: {
      type: CreateUserDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithId,
    },
    201
  )
  async createUser(@Body() body: CreateUserDTO) {
    return await this.userService.createUser(body);
  }

  @Patch(':userId')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('ADMIN'))
  @RequestApi({
    summary: {
      description: '유저 수정',
      summary: '유저 수정하기 - 로그인 필요, 관리자만 사용 가능',
    },
    params: {
      name: 'userId',
      type: 'string',
      description: '유저 아이디',
    },
    body: {
      type: UpdateUserDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateUser(@Param('userId') userId: string, @Body() body: CreateUserDTO) {
    await this.userService.updateUser(userId, body);
  }

  @Patch('')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('USER'))
  @RequestApi({
    summary: {
      description: '내 정보 수정',
      summary: '유저 수정하기 - 로그인 필요, 유저만 사용 가능',
    },

    body: {
      type: UpdateUserDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMe(@ReqUser() user: RequestUser, @Body() body: CreateUserDTO) {
    await this.userService.updateUser(user.id, body);
  }

  @Delete(':userId')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('ADMIN'))
  @RequestApi({
    summary: {
      description: '유저 삭제',
      summary: '유저 삭제하기 - 로그인 필요, 관리자만 사용 가능',
    },
    params: {
      name: 'userId',
      type: 'string',
      description: '유저 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteUser(@Param('userId') userId: string) {
    await this.userService.deleteUser(userId);
  }

  @Delete(':userId/hard')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('ADMIN'))
  @RequestApi({
    summary: {
      description: '유저 삭제 [hard delete]',
      summary: '유저 삭제하기 (사용 시 유저가 DB에서 사라집니다.) - 로그인 필요, 관리자만 사용 가능',
    },
    params: {
      name: 'userId',
      type: 'string',
      description: '유저 아이디',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async hardDeleteUser(@Param('userId') userId: string) {
    await this.userService.hardDeleteUser(userId);
  }

  @Delete('')
  @Auth(JwtAuthGuard)
  @UseInterceptors(RoleInterceptorAPI('USER'))
  @RequestApi({
    summary: {
      description: '내 정보 삭제',
      summary: '유저 삭제하기 - 로그인 필요, 유저만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMe(@ReqUser() user: RequestUser) {
    await this.userService.deleteUser(user.id);
  }
}
