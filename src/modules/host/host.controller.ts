import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { CommonUserDTO } from '../user/dto';
import { CertificatePhoneDTO } from '../user/dto/certificate-phone.dto';

import {
  CheckHostDTO,
  CreateHostAccountDTO,
  HostAccountDTO,
  HostDTO,
  IsHostCheckedDTO,
  NewPasswordDTO,
  UpdateHostAccountDTO,
  UpdateHostDTO,
  UpdateHostPasswordDTO,
} from './dto';
import { HostDetailDTO } from './dto/host-detail.dto';
import { HostService } from './host.service';

@ApiController('', '호스트')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Get('detail/spaces/:spaceId')
  @RequestApi({
    summary: {
      description: '공간 id 로 호스트 조회하기기',
      summary: '공간 id 로 호스트 조회하기기',
    },
  })
  @ResponseApi({
    type: HostDetailDTO,
  })
  async getHostBySpaceId(@Param('spaceId') id: string) {
    return await this.hostService.findHostBySpaceId(id);
  }

  @Get('me')
  @Auth([JwtAuthGuard, RoleGuard('HOST')])
  @RequestApi({
    summary: {
      description: '내 정보 조회',
      summary: '내 정보 조회 - 호스트만 사용 가능',
    },
  })
  @ResponseApi({
    type: HostDetailDTO,
  })
  async getMe(@ReqUser() user: RequestHost) {
    return await this.hostService.findHost(user.id);
  }

  @Get('me/detail')
  @Auth([JwtAuthGuard, RoleGuard('HOST')])
  @RequestApi({
    summary: {
      description: '내 정보 상세 조회',
      summary: '내 정보 상세 조회 - 호스트만 사용 가능',
    },
  })
  @ResponseApi({
    type: HostDetailDTO,
  })
  async getMeDetail(@ReqUser() user: RequestHost) {
    return await this.hostService.findHostDetail(user.id);
  }

  @Post('check')
  @RequestApi({
    summary: {
      description: '호스트 유무 확인',
      summary: '호스트 유무 확인',
    },
    body: {
      type: CheckHostDTO,
    },
  })
  @ResponseApi(
    {
      type: IsHostCheckedDTO,
    },
    200
  )
  async checkHost(@Body() body: CheckHostDTO) {
    return await this.hostService.checkHost(body);
  }

  @Get('accounts/me')
  @Auth([JwtAuthGuard, RoleGuard('HOST')])
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

  @Post('reset/password')
  @RequestApi({
    summary: {
      description: '비밀번호 재설정',
      summary: '비밀번호 재설정',
    },
    body: {
      type: UpdateHostPasswordDTO,
    },
  })
  @ResponseApi({
    type: NewPasswordDTO,
  })
  async updatePassword(@Body() body: UpdateHostPasswordDTO) {
    return await this.hostService.updateHostPassword(body);
  }

  @Patch()
  @Auth([JwtAuthGuard, RoleGuard('HOST')])
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
  @Auth([JwtAuthGuard, RoleGuard('HOST')])
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
  @Auth([JwtAuthGuard, RoleGuard('HOST')])
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
  @Auth([JwtAuthGuard, RoleGuard('HOST')])
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
  @Auth([JwtAuthGuard, RoleGuard('HOST')])
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

  @Post('certificate/phone')
  @RequestApi({
    summary: {
      description: '휴대폰 인증',
      summary: '휴대폰 인증',
    },
  })
  @ResponseApi({
    type: HostDTO,
  })
  async certificatePhone(@ReqUser() user: RequestHost, @Body() body: CertificatePhoneDTO) {
    return await this.hostService.certificateUser(user.id, body);
  }
}
