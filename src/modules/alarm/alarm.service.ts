import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PaginationDTO, PagingDTO } from 'wemacu-nestjs';

import { FCMEvent } from '@/event/fcm';

import { UserRepository } from '../user/user.repository';

import { AlarmRepository } from './alarm.repository';
import { AlarmDTO } from './dto';
import {
  AlarmResultDTO,
  AlarmResultsDTO,
  SendMessageDTO,
  SendMessagesDTO,
  SendScheduleMessageDTO,
  SendScheduleMessagesDTO,
} from './dto/fcm';
import { AlarmException } from './exception/alarm.exception';
import { ALARM_ERROR_CODE, ALARM_MUTATION_FORBIDDEN, ALARM_PUSH_TOKEN_NOT_FOUND } from './exception/errorCode';

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
