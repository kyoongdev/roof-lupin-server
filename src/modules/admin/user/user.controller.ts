import { Get, Param, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { FindUsersQuery } from '@/modules/user/dto/query';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminUserDTO } from '../dto/user';

import { AdminUserService } from './user.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('users', '[관리자] 유저관리')
export class AdminUserController {
  constructor(private readonly userService: AdminUserService) {}

  @Get(':userId/detail')
  @RequestApi({
    summary: {
      description: '유저 상세 조회',
      summary: '유저 상세 조회',
    },
  })
  @ResponseApi({
    type: AdminUserDTO,
  })
  async findUser(@Param('userId') id: string) {
    return await this.userService.findUser(id);
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '유저 목록 조회',
      summary: '유저 목록 조회',
    },
  })
  @ResponseApi({
    type: AdminUserDTO,
  })
  async findPagingUsers(@Paging() paging: PagingDTO, @Query() query: FindUsersQuery) {
    return await this.userService.findPagingUsers(paging, query.generateQuery());
  }
}
