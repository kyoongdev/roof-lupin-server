import { Body, Delete, Get, Param, Patch, Post, Query, Request, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { CreateServiceDTO, UpdateServiceDTO } from '@/modules/service/dto';
import { CreateServiceTitleDTO } from '@/modules/service/dto/create-service-title.dto';
import { ServiceTitleDTO } from '@/modules/service/dto/service-title.dto';
import { UpdateServiceTitleDTO } from '@/modules/service/dto/update-service-title.dto';
import { ServiceDTO } from '@/modules/space/dto/service';
import { ApiController, JwtAuthGuard, ResponseWithIdInterceptor } from '@/utils';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminFindServicesQuery } from '../dto/query/service';

import { AdminServiceService } from './service.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('services', '[관리자] 서비스 관리자')
export class AdminServiceController {
  constructor(private readonly serviceService: AdminServiceService) {}

  @Get('')
  @RequestApi({
    summary: {
      summary: '서비스 리스트 조회',
      description: '서비스 리스트 조회',
    },
  })
  @ResponseApi({
    type: ServiceDTO,
    isArray: true,
  })
  async findServices(@Query() query: AdminFindServicesQuery) {
    console.log(query.generateQuery());
    return this.serviceService.findServices(query.generateQuery());
  }

  @Get(':serviceId/detail')
  @RequestApi({
    summary: {
      summary: '서비스 단일 조회',
      description: '서비스 단일 조회',
    },
  })
  @ResponseApi({
    type: ServiceDTO,
  })
  async findService(@Param('serviceId') id: string) {
    return this.serviceService.findService(id);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '서비스 생성',
      summary: '서비스 생성',
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createService(@Body() data: CreateServiceDTO) {
    return await this.serviceService.createService(data);
  }

  @Patch(':serviceId')
  @RequestApi({
    summary: {
      description: '서비스 수정',
      summary: '서비스 수정',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateService(@Param('serviceId') id: string, @Body() data: UpdateServiceDTO) {
    await this.serviceService.updateService(id, data);
  }

  @Delete(':serviceId')
  @RequestApi({
    summary: {
      description: '서비스 삭제',
      summary: '서비스 삭제',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteService(@Param('serviceId') id: string) {
    await this.serviceService.deleteService(id);
  }

  @Get('titles')
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

  @Get('titles/:serviceTitleId/detail')
  @RequestApi({
    summary: {
      description: '서비스 타이틀 단일 조회',
      summary: '서비스 타이틀 단일 조회 ',
    },
  })
  @ResponseApi({
    type: ServiceTitleDTO,
  })
  async findServiceTitle(@Param('serviceTitleId') id: string) {
    return this.serviceService.findServiceTitle(id);
  }

  @Post('titles')
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

  @Patch('titles/:serviceTitleId')
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
