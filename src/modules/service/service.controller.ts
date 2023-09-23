import { Get } from '@nestjs/common';

import { RequestApi, ResponseApi } from 'cumuco-nestjs';

import { ApiController } from '@/utils';

import { ServiceDTO } from '../space/dto/service';

import { ServiceTitleDTO } from './dto/service-title.dto';
import { ServiceService } from './service.service';

@ApiController('services', '서비스')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('titles')
  @RequestApi({
    summary: {
      description: '서비스 타이틀 리스트 조회',
      summary: '서비스 타이틀 리스트 조회 - 필터에 사용',
    },
  })
  @ResponseApi({
    type: ServiceTitleDTO,
    isArray: true,
  })
  async findServiceTitles() {
    return this.serviceService.findServiceTitles();
  }

  @Get('')
  @RequestApi({
    summary: {
      description: '서비스  리스트 조회',
      summary: '서비스  리스트 조회',
    },
  })
  @ResponseApi({
    type: ServiceDTO,
    isArray: true,
  })
  async findServices() {
    return this.serviceService.findServices();
  }
}
