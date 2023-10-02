import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'cumuco-nestjs';

import { AlarmRepository } from './alarm.repository';
import { AlarmDTO, UnReadAlarmDTO } from './dto';
import { AlarmException } from './exception/alarm.exception';
import { ALARM_ERROR_CODE } from './exception/errorCode';

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
      orderBy: [
        {
          isRead: 'asc',
        },
        {
          createdAt: 'desc',
        },
      ],
      skip,
      take,
    });

    return new PaginationDTO<AlarmDTO>(alarms, { count, paging });
  }

  async checkUnReadAlarmExists(userId: string) {
    const count = await this.alarmRepository.countAlarms({
      where: {
        userId,
        isRead: false,
      },
    });

    return new UnReadAlarmDTO({ isExists: count > 0 });
  }

  async readAlarm(id: string, userId: string) {
    const alarm = await this.findAlarm(id);

    if (alarm.user.id !== userId) {
      throw new AlarmException(ALARM_ERROR_CODE.ALARM_MUTATION_FORBIDDEN);
    }
    await this.alarmRepository.updateAlarm(id, { isRead: true });
  }

  async deleteAlarm(id: string, userId: string) {
    const alarm = await this.findAlarm(id);

    if (alarm.user.id !== userId) {
      throw new AlarmException(ALARM_ERROR_CODE.ALARM_MUTATION_FORBIDDEN);
    }
    await this.alarmRepository.deleteAlarm(id);
  }
}
