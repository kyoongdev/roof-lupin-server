import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { HARD_DELETE_FAILED, USER_ERROR_CODE } from '@/modules/user/exception/errorCode';
import { UserException } from '@/modules/user/exception/user.exception';
import { numberToSocialType } from '@/modules/user/utils';

import { AdminUpdateUserDTO, AdminUserDTO } from '../dto/user';

@Injectable()
export class AdminUserRepository {
  constructor(private readonly database: PrismaService) {}

  async findUsers(args = {} as Prisma.UserFindManyArgs) {
    const users = await this.database.user.findMany({
      ...args,
      include: {
        socials: true,
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
    });

    return users.map(
      (user) =>
        new AdminUserDTO({
          ...user,
          socialType: numberToSocialType(user.socials[0].socialType),
        })
    );
  }

  async countUsers(args = {} as Prisma.UserCountArgs) {
    return await this.database.user.count(args);
  }

  async findUser(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
      include: {
        socials: true,
      },
    });

    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND());
    }

    return new AdminUserDTO({
      ...user,
      socialType: numberToSocialType(user.socials[0].socialType),
    });
  }

  async updateUser(id: string, data: AdminUpdateUserDTO) {
    await this.database.user.update({
      where: {
        id,
      },
      data: {
        ...data,
        blockedAt: data.isBlocked ? new Date() : null,
      },
    });
  }

  async hardDeleteUser(id: string) {
    const user = await this.findUser(id);

    if (!user.deletedAt) {
      throw new UserException(USER_ERROR_CODE.FORBIDDEN(HARD_DELETE_FAILED));
    }

    await this.database.user.delete({
      where: {
        id,
      },
    });
  }

  async deleteUser(id: string) {
    await this.database.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async restoreUser(id: string) {
    await this.database.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
}
