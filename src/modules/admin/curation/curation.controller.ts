import { Get, Param } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'wemacu-nestjs';

import { CurationDetailDTO, CurationDTO } from '@/modules/curation/dto';
import { ApiController } from '@/utils';

import { AdminCurationService } from './curation.service';

@ApiController('/curations', '[관리자] 큐레이션 관리')
export class AdminCurationController {
  constructor(private readonly curationService: AdminCurationService) {}

  @Get(':curationId/detail')
  @RequestApi({
    summary: {
      description: '큐레이션 자세히 불러오기',
      summary: '큐레이션 자세히 불러오기',
    },
  })
  @ResponseApi({
    type: CurationDetailDTO,
  })
  async getCuration(@Param('curationId') id: string) {
    return await this.curationService.findCuration(id);
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '큐레이션 목록 불러오기',
      summary: '큐레이션 목록 불러오기',
    },
  })
  @ResponseApi({
    type: CurationDTO,
    isPaging: true,
  })
  async getCurations(@Param('curationId') id: string) {
    return await this.curationService.findCuration(id);
  }
}
