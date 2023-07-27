import { Body, Delete, Get, Param, Post } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'cumuco-nestjs';

import { EmptyResponseDTO } from '@/common';
import { RequestUser } from '@/interface/role.interface';
import { ApiController, ReqUser } from '@/utils';
import { JwtAuthGuard } from '@/utils/guards';
import { RoleGuard } from '@/utils/guards/role.guard';

import { AlarmService } from './alarm.service';
import { AlarmDTO } from './dto';

@Auth([JwtAuthGuard, RoleGuard('USER')])
@ApiController('alarms', '알람')
export class AlarmController {
  constructor(private readonly alarmService: AlarmService) {}

  @Get(':alarmId/detail')
  @RequestApi({
    summary: {
      description: '알람 상세 불러오기',
      summary: '알람 상세 불러오기 - 유저만 사용 가능합니다.',
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

  @Get()
  @RequestApi({
    summary: {
      description: '알람 목록 불러오기',
      summary: '알람 목록 불러오기 - 유저만 사용 가능합니다.',
    },
    query: {
      type: PagingDTO,
    },
  })
  @ResponseApi({
    type: AlarmDTO,
    isPaging: true,
  })
  async getAlarms(@Paging() paging: PagingDTO, @ReqUser() user: RequestUser) {
    return await this.alarmService.findPagingAlarms(paging, {
      where: {
        userId: user.id,
      },
    });
  }

  @Post(':alarmId/read')
  @RequestApi({
    summary: {
      description: '알람 읽음 처리',
      summary: '알람 읽음 처리 - 유저만 사용 가능합니다.',
    },
    params: {
      name: 'alarmId',
      type: 'string',
      required: true,
      description: '알람 ID',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async readAlarm(@Param('alarmId') id: string, @ReqUser() user: RequestUser) {
    return await this.alarmService.readAlarm(id, user.id);
  }

  @Delete(':alarmId')
  @RequestApi({
    summary: {
      description: '알람 삭제',
      summary: '알람 삭제 - 유저만 사용 가능합니다.',
    },
    params: {
      name: 'alarmId',
      type: 'string',
      required: true,
      description: '알람 ID',
    },
  })
  @ResponseApi({
    type: EmptyResponseDTO,
  })
  async deleteAlarm(@Param('alarmId') id: string, @ReqUser() user: RequestUser) {
    return await this.alarmService.deleteAlarm(id, user.id);
  }
}
