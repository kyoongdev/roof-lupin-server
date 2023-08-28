import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { AlarmDTO, CreateAlarmDTO, UpdateAlarmDTO } from './dto';
import { AlarmException } from './exception/alarm.exception';
import { ALARM_ERROR_CODE, ALARM_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class AlarmRepository {
  constructor(private readonly database: PrismaService) {}

  async findAlarm(id: string) {
    const alarm = await this.database.userAlarm.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          include: {
            socials: true,
          },
        },
      },
    });

    if (!alarm) {
      throw new AlarmException(ALARM_ERROR_CODE.NOT_FOUND(ALARM_NOT_FOUND));
    }

    return new AlarmDTO(alarm);
  }

  async countAlarms(args = {} as Prisma.UserAlarmCountArgs) {
    return await this.database.userAlarm.count(args);
  }

  async findAlarms(args = {} as Prisma.UserAlarmFindManyArgs) {
    const alarms = await this.database.userAlarm.findMany({
      ...args,
      include: {
        user: {
          include: {
            socials: true,
          },
        },
      },
    });

    return alarms.map((alarm) => new AlarmDTO(alarm));
  }

  async createAlarm(data: CreateAlarmDTO) {
    const { spaceId, exhibitionId, userId, ...rest } = data;
    const alarm = await this.database.userAlarm.create({
      data: {
        ...rest,
        user: {
          connect: {
            id: userId,
          },
        },
        ...(spaceId && {
          alarmSpace: {
            create: {
              space: {
                connect: {
                  id: spaceId,
                },
              },
            },
          },
        }),
        ...(exhibitionId && {
          alarmExhibition: {
            create: {
              exhibition: {
                connect: {
                  id: exhibitionId,
                },
              },
            },
          },
        }),
      },
      include: {
        user: {
          include: {
            socials: true,
          },
        },
      },
    });

    return alarm.id;
  }

  async updateAlarm(id: string, data: UpdateAlarmDTO) {
    await this.database.userAlarm.update({
      where: {
        id,
      },
      data,
      include: {
        user: {
          include: {
            socials: true,
          },
        },
      },
    });
  }

  async deleteAlarm(id: string) {
    await this.database.userAlarm.delete({
      where: {
        id,
      },
    });
  }
}
