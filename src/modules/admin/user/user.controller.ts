import { Body, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, IdsDTO } from '@/common';
import { FindUsersQuery } from '@/modules/user/dto/query';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminUpdateUserDTO, AdminUserDTO, BlockUserDTO } from '../dto/user';

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

  @Patch(':userId')
  @RequestApi({
    summary: {
      description: '유저 정보 수정',
      summary: '유저 정보 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateUser(@Param('userId') id: string, @Body() body: AdminUpdateUserDTO) {
    return await this.userService.updateUser(id, body);
  }

  @Post(':userId/block')
  @RequestApi({
    summary: {
      description: '유저 차단시키기',
      summary: '유저 차단시키기',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async blockUser(@Param('userId') id: string, @Body() body: BlockUserDTO) {
    return await this.userService.blockUser(id, body);
  }

  @Post(':userId/un-block')
  @RequestApi({
    summary: {
      description: '유저 차단 해제',
      summary: '유저 차단 해제',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async unBlockUser(@Param('userId') id: string) {
    return await this.userService.unBlockUser(id);
  }

  @Post(':userId/restore')
  @RequestApi({
    summary: {
      description: '유저 복구',
      summary: '유저 복구',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async restoreUser(@Param('userId') id: string) {
    return await this.userService.restoreUser(id);
  }

  @Delete('hard/many')
  @RequestApi({
    summary: {
      description: '유저 다수 영구 삭제',
      summary: '유저 다수 영구 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteUsers(@Query() query: IdsDTO) {
    await Promise.all(
      query.ids.map(async (id) => {
        await this.userService.hardDeleteUser(id);
      })
    );
  }

  @Delete(':userId/soft')
  @RequestApi({
    summary: {
      description: '유저 삭제',
      summary: '유저 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteUser(@Param('userId') id: string) {
    return await this.userService.deleteUser(id);
  }

  @Delete(':userId/hard')
  @RequestApi({
    summary: {
      description: '유저 영구 삭제',
      summary: '유저 영구 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async hardDeleteUser(@Param('userId') id: string) {
    return await this.userService.hardDeleteUser(id);
  }
}
