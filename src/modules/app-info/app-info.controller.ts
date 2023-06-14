import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { CreateCache } from '@/utils/cache';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AppInfoService } from './app-info.service';
import { AppInfoDTO, CreateAppInfoDTO, UpdateAppInfoDTO } from './dto';

@ApiController('app-infos', '앱 정보')
export class AppInfoController {
  constructor(private readonly appInfoService: AppInfoService) {}

  @Get()
  @CreateCache({ key: 'APP_INFO', ttl: 60 * 60 * 24 })
  @RequestApi({
    summary: {
      description: '앱 정보 조회',
      summary: '앱 정보 조회',
    },
  })
  @ResponseApi({
    type: AppInfoDTO,
    isArray: true,
  })
  async findAppInfos() {
    return this.appInfoService.findAppInfos();
  }

  @Post()
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '앱 정보 생성',
      summary: '앱 정보 생성 - 관리자만 사용가능합니다.',
    },
    body: {
      type: CreateAppInfoDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createAppInfo(data: CreateAppInfoDTO) {
    return this.appInfoService.createAppInfo(data);
  }

  @Patch(':appInfoId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '앱 정보 수정',
      summary: '앱 정보 수정 - 관리자만 사용가능합니다.',
    },
    params: {
      description: '앱 정보 아이디',
      type: 'string',
      name: 'appInfoId',
      required: true,
    },
    body: {
      type: UpdateAppInfoDTO,
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateAppInfo(@Param('appInfoId') id: string, @Body() body: UpdateAppInfoDTO) {
    return this.appInfoService.updateAppInfo(id, body);
  }

  @Delete(':appInfoId')
  @Auth([JwtAuthGuard, RoleGuard('ADMIN')])
  @RequestApi({
    summary: {
      description: '앱 정보 삭제',
      summary: '앱 정보 삭제 - 관리자만 사용가능합니다.',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteAppInfo(@Param('appInfoId') id: string) {
    return this.appInfoService.deleteAppInfo(id);
  }
}
