import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { AlarmRepository } from './alarm.repository';
import { AlarmDTO, CreateAlarmDTO, UpdateAlarmDTO } from './dto';
import { AlarmException } from './exception/alarm.exception';
import { ALARM_ERROR_CODE, ALARM_MUTATION_FORBIDDEN } from './exception/errorCode';

@Injectable()
export class AlarmService {
  constructor(private readonly alarmRepository: AlarmRepository) {}

  async findAlarm(id: string) {
    return await this.alarmRepository.findAlarm(id);
  }

  async findPagingAlarms(paging: PagingDTO, args = {} as Prisma.UserAlarmFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.alarmRepository.countAlarms({
      where: args.where,
    });
    const alarms = await this.alarmRepository.findAlarms({
      where: args.where,
      orderBy: {
        createdAt: 'desc',
        isRead: 'asc',
      },
      skip,
      take,
    });

    return new PaginationDTO<AlarmDTO>(alarms, { count, paging });
  }

  async readAlarm(id: string, userId: string) {
    const alarm = await this.findAlarm(id);

    if (alarm.user.id !== userId) {
      throw new AlarmException(ALARM_ERROR_CODE.NOT_FOUND(ALARM_MUTATION_FORBIDDEN));
    }
    await this.alarmRepository.updateAlarm(id, { isRead: true });
  }

  async deleteAlarm(id: string, userId: string) {
    const alarm = await this.findAlarm(id);

    if (alarm.user.id !== userId) {
      throw new AlarmException(ALARM_ERROR_CODE.NOT_FOUND(ALARM_MUTATION_FORBIDDEN));
    }
    await this.alarmRepository.deleteAlarm(id);
  }
}
