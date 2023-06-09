import { Get } from '@nestjs/common';

import { Auth, Paging, PagingDTO, RequestApi, ResponseApi } from 'wemacu-nestjs';

import { AlarmDTO } from '@/modules/alarm/dto';
import { ApiController } from '@/utils';
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
}
