import { Get, Param } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { RequestHost } from '@/interface/role.interface';
import { SpaceDetailDTO } from '@/modules/space/dto';
import { ApiController, ReqUser } from '@/utils';
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
}
