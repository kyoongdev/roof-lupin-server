import { Body, Delete, Get, Patch } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CountInfoDTO, PushTokenDTO, UpdateUserDTO } from './dto';
import { CommonUserDTO } from './dto/common-user.dto';
import { UserService } from './user.service';

@Auth([JwtAuthGuard, RoleGuard('USER')])
@ApiController('users', '유저')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me/push-token')
  @RequestApi({
    summary: {
      description: '나의 푸시토큰 불러오기',
      summary: '나의 푸시토큰 불러오기',
    },
  })
  @ResponseApi({
    type: PushTokenDTO,
  })
  async getMyPushToken(@ReqUser() user: RequestUser) {
    return await this.userService.findMyPushToken(user.id);
  }

  @Get('me')
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

  @Get('me/count-info')
  @RequestApi({
    summary: {
      description: '내 정보 카운트 정보 불러오기',
      summary: '내 정보 카운트 정보 불러오기',
    },
  })
  @ResponseApi({
    type: CountInfoDTO,
  })
  async getMyCountInfo(@ReqUser() user: RequestUser) {
    return await this.userService.getCountInfo(user.id);
  }

  @Patch('')
  @RequestApi({
    summary: {
      description: '내 정보 수정',
      summary: '유저 수정하기 - 로그인 필요, 유저만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMe(@ReqUser() user: RequestUser, @Body() body: UpdateUserDTO) {
    await this.userService.updateUser(user.id, body);
  }

  @Delete('')
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
