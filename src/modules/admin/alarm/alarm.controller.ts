import { Body, Delete, Get, Param, Patch, Post, UseInterceptors } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO, ResponseWithIdDTO } from '@/common';
import { AlarmDTO, CreateAlarmDTO, UpdateAlarmDTO } from '@/modules/alarm/dto';
import { ApiController, ResponseWithIdInterceptor } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminAlarmService } from './alarm.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('admins/alarms', '[관리자] 알람 관리')
export class AdminAlarmController {
  constructor(private readonly alarmService: AdminAlarmService) {}

  @Get()
  @RequestApi({
    summary: {
      description: '알람 목록 불러오기',
      summary: '알람 목록 불러오기 - 관리자만 사용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: AlarmDTO,
    isPaging: true,
  })
  async getAlarms(@Paging() paging: PagingDTO) {
    return await this.alarmService.findPagingAlarms(paging);
  }

  @Get(':alarmId/detail')
  @RequestApi({
    summary: {
      description: '알람 상세 불러오기',
      summary: '알람 상세 불러오기 - 관리자만 사용 가능합니다.',
    },
    params: {
      name: 'alarmId',
      type: 'string',
      required: true,
      description: '알람 ID',
    },
  })
  @ResponseApi({
    type: AlarmDTO,
  })
  async getAlarm(@Param('alarmId') id: string) {
    return await this.alarmService.findAlarm(id);
  }

  @Post()
  @UseInterceptors(ResponseWithIdInterceptor)
  @RequestApi({
    summary: {
      description: '알람 생성하기',
      summary: '알람 생성하기 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: CreateAlarmDTO,
    },
  })
  @ResponseApi(
    {
      type: ResponseWithIdDTO,
    },
    201
  )
  async createAlarm(@Body() createAlarmDTO: CreateAlarmDTO) {
    return await this.alarmService.createAlarm(createAlarmDTO);
  }

  @Patch(':alarmId')
  @RequestApi({
    summary: {
      description: '알람 수정하기',
      summary: '알람 수정하기 - 관리자만 사용 가능합니다.',
    },
    body: {
      type: UpdateAlarmDTO,
    },
    params: {
      name: 'alarmId',
      type: 'string',
      required: true,
      description: '알람 ID',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async updateAlarm(@Param('alarmId') id: string, @Body() body: UpdateAlarmDTO) {
    await this.alarmService.updateAlarm(id, body);
  }

  @Delete(':alarmId')
  @RequestApi({
    summary: {
      description: '알람 삭제하기',
      summary: '알람 삭제하기 - 관리자만 사용 가능합니다.',
    },

    params: {
      name: 'alarmId',
      type: 'string',
      required: true,
      description: '알람 ID',
    },
  })
  @ResponseApi(
    {
      type: EmptyResponseDTO,
    },
    204
  )
  async deleteAlarm(@Param('alarmId') id: string) {
    await this.alarmService.deleteAlarm(id);
  }
}
