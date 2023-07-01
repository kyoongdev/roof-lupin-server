import { Body, Delete, Get, Param, Post } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { EmptyResponseDTO } from '@/common';
import { AlarmDTO } from '@/modules/alarm/dto';
import {
  AlarmResultDTO,
  AlarmResultsDTO,
  SendMessageDTO,
  SendMessagesDTO,
  SendScheduleMessageDTO,
  SendScheduleMessagesDTO,
} from '@/modules/alarm/dto/fcm';
import { ApiController } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AdminAlarmService } from './alarm.service';

@Auth([JwtAuthGuard, RoleGuard('ADMIN')])
@ApiController('alarms', '[관리자] 알람 관리')
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

  @Post('/fcm')
  @RequestApi({
    summary: {
      description: '알람 보내기',
      summary: '알람 보내기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: AlarmResultDTO,
  })
  async sendAlarm(@Body() body: SendMessageDTO) {
    return await this.alarmService.sendAlarm(body);
  }

  @Post('/fcm/many')
  @RequestApi({
    summary: {
      description: '다수 알람 보내기',
      summary: '다수 알람 보내기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: AlarmResultsDTO,
  })
  async sendAlarms(@Body() body: SendMessagesDTO) {
    return await this.alarmService.sendAlarms(body);
  }

  @Post('/fcm/schedule')
  @RequestApi({
    summary: {
      description: '특정 시간대 알람 보내기',
      summary: '특정 알람 보내기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: AlarmResultDTO,
  })
  async sendScheduleAlarm(@Body() body: SendScheduleMessageDTO) {
    return await this.alarmService.sendScheduleAlarm(body);
  }

  @Post('/fcm/schedule/many')
  @RequestApi({
    summary: {
      description: '특정 시간대 다수 알람 보내기',
      summary: '특정 시간대 다수 알람 보내기 - 관리자만 사용 가능합니다.',
    },
  })
  @ResponseApi({
    type: AlarmResultsDTO,
  })
  async sendScheduleAlarms(@Body() body: SendScheduleMessagesDTO) {
    return await this.alarmService.sendScheduleAlarms(body);
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
