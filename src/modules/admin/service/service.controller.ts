import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateServiceTitleDTO } from '@/modules/service/dto/create-service-title.dto';
import { ServiceTitleDTO } from '@/modules/service/dto/service-title.dto';
import { UpdateServiceTitleDTO } from '@/modules/service/dto/update-service-title.dto';
import { ApiController, JwtAuthGuard, ResponseWithIdInterceptor } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminServiceService } from './service.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('services', '[관리자] 서비스 관리자')
export class AdminServiceController {
  constructor(private readonly serviceService: AdminServiceService) {}

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

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '서비스 타이틀 생성',
      summary: '서비스 타이틀 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createServiceTitle(@Body() body: CreateServiceTitleDTO) {
    return await this.serviceService.createServiceTitle(body);
  }

  @Patch(':serviceTitleId')
  @RequestApi({
    summary: {
      description: '서비스 타이틀 수정',
      summary: '서비스 타이틀 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateServiceTitle(@Param('serviceTitleId') id: string, @Body() body: UpdateServiceTitleDTO) {
    await this.serviceService.updateServiceTitle(id, body);
  }

  @Delete(':serviceTitleId')
  @RequestApi({
    summary: {
      description: '서비스 타이틀 삭제',
      summary: '서비스 타이틀 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteServiceTitle(@Param('serviceTitleId') id: string) {
    await this.serviceService.deleteServiceTitle(id);
  }
}
