import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateServiceTitleDTO } from '@/modules/service/dto/create-service-title.dto';
import { ServiceTitleDTO } from '@/modules/service/dto/service-title.dto';
import { UpdateServiceTitleDTO } from '@/modules/service/dto/update-service-title.dto';
import { ApiController, JwtAuthGuard, ResponseWithIdInterceptor } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { HostServiceService } from './service.service';

@Auth([JwtAuthGuard, RoleGuard('HOST')])
@ApiController('services', '[관리자] 서비스 관리자')
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
