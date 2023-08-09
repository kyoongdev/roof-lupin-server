import { Get } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ServiceTitleDTO } from '@/modules/service/dto/service-title.dto';
import { ApiController, JwtAuthGuard } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostServiceService } from './service.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('services', '[호스트] 서비스')
export class HostServiceController {
  constructor(private readonly serviceService: HostServiceService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '서비스 타이틀 리스트 조회',
      summary: '서비스 타이틀 리스트 조회 ',
    },
  })
  @ResponseApi({
    type: ServiceTitleDTO,
    isArray: true,
  })
  async findServiceTitles() {
    return this.serviceService.findServiceTitles();
  }
}
