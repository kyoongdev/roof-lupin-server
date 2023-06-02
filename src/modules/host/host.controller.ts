import { Body, Delete, Get, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithId, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CreateHostAccountDTO, HostAccountDTO, HostDTO, UpdateHostAccountDTO, UpdateHostDTO } from './dto';
import { HostService } from './host.service';

@ApiController('hosts', '호스트')
@Auth([JwtAuthGuard, RoleGuard('HOST')])
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('me')
  @RequestApi({
    summary: {
      description: '내 정보 조회',
      summary: '내 정보 조회 - 호스트만 사용 가능',
    },
  })
  @ResponseApi({
    type: HostDTO,
  })
  async getMe(@ReqUser() user: RequestHost) {
    return await this.hostService.findHost(user.id);
  }

  @Get('accounts/me')
  @RequestApi({
    summary: {
      description: '내 계좌 정보 조회',
      summary: '내 계좌 조회 - 호스트만 사용 가능',
    },
  })
  @ResponseApi({
    type: HostAccountDTO,
  })
  async getMyAccount(@ReqUser() user: RequestHost) {
    return await this.hostService.findHostAccountByHostId(user.id);
  }

  @Patch()
  @RequestApi({
    summary: {
      description: '내 정보 수정',
      summary: '내 정보 수정 - 호스트만 사용 가능',
    },
    body: {
      type: UpdateHostDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateMe(@ReqUser() user: RequestHost, @Body() body: UpdateHostDTO) {
    await this.hostService.updateHost(user.id, body);
  }

  @Delete()
  @RequestApi({
    summary: {
      description: '내 정보 삭제',
      summary: '내 정보 삭제 - 호스트만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteMe(@ReqUser() user: RequestHost) {
    await this.hostService.deleteHost(user.id);
  }

  @Post('accounts')
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '계좌 정보 생성',
      summary: '계좌 정보 생성 - 호스트만 사용 가능',
    },
    body: {
      type: CreateHostAccountDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createAccount(@ReqUser() user: RequestHost, @Body() body: CreateHostAccountDTO) {
    return await this.hostService.createHostAccount(user.id, body);
  }

  @Patch('accounts')
  @RequestApi({
    summary: {
      description: '계좌 정보 수정',
      summary: '계좌 정보 수정 - 호스트만 사용 가능',
    },
    body: {
      type: UpdateHostAccountDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateAccount(@ReqUser() user: RequestHost, @Body() body: UpdateHostAccountDTO) {
    await this.hostService.updateHostAccountByHostId(user.id, body);
  }

  @Delete('accounts')
  @RequestApi({
    summary: {
      description: '계좌 정보 삭제',
      summary: '계좌 정보 삭제 - 호스트만 사용 가능',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteAccount(@ReqUser() user: RequestHost) {
    await this.hostService.deleteHostAccountByHostId(user.id);
  }
}
