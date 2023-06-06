import { Body, Get, Param, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { ResponseWithIdDTO } from '@/common';
import { RequestHost } from '@/interface/role.interface';
import { SpaceDetailDTO, SpaceDTO } from '@/modules/space/dto';
import { CreateSpaceDTO } from '@/modules/space/dto/create-space.dto';
import { ApiController, ReqUser, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostSpaceService } from './space.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('hosts/spaces', '[호스트] 공간 관리')
export class HostSpaceController {
  constructor(private readonly spaceService: HostSpaceService) {}

  @Get(':spaceId')
  @RequestApi({
    summary: {
      description: '공간 상세 조회',
      summary: '공간 상세 조회 - 호스트만 사용가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDetailDTO,
  })
  async getSpace(@Param('spaceId') id: string, @ReqUser() user: RequestHost) {
    return await this.spaceService.findSpace(id, user.id);
  }

  @Get()
  @RequestApi({
    summary: {
      description: '공간 목록 조회',
      summary: '공간 목록 조회 - 호스트만 사용가능합니다.',
    },
  })
  @ResponseApi({
    type: SpaceDTO,
    isArray: true,
  })
  async getSpaces(@ReqUser() user: RequestHost) {
    return await this.spaceService.findSpaces(user.id);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '공간 등록',
      summary: '공간 등록 - 호스트만 사용가능합니다.',
    },
    body: {
      type: CreateSpaceDTO,
    },
  })
  @ResponseApi({
    type: ResponseWithIdDTO,
  })
  async createSpace(@ReqUser() user: RequestHost, @Body() body: CreateSpaceDTO) {
    return await this.spaceService.createSpace(user.id, body);
  }
}
