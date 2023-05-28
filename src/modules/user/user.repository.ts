import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { SOCIAL_USER_NOT_FOUND, USER_ERROR_CODE } from './exception/errorCode';
import { UserException } from './exception/user.exception';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaService) {}

  async findUsers(args = {} as Prisma.UserFindManyArgs) {
    const users = await this.database.user.findMany(args);

    return users;
  }

  async findPagingUsers(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const { skip, take } = paging.getSkipTake();
    const count = await this.database.user.count({
      where: args.where,
    });
    const rows = await this.database.user.findMany({
      where: {
        ...args.where,
      },
      skip,
      take,
    });

    return { count, rows };
  }

  async findUser(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND());
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = await this.database.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND());
    }
    return user;
  }

  async findUserByName(name: string) {
    const user = await this.database.user.findFirst({
      where: {
        name,
      },
    });
    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND());
    }
    return user;
  }

  async findUserByNickname(nickname: string) {
    const user = await this.database.user.findFirst({
      where: {
        nickname,
      },
    });
    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND());
    }
    return user;
  }

  async findUserBySocialId(socialId: string) {
    const socialUser = await this.database.userSocial.findUnique({
      where: {
        socialId,
      },
      include: {
        user: true,
      },
    });

    if (!socialUser) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND(SOCIAL_USER_NOT_FOUND));
    }

    return socialUser.user;
  }

  async checkUserBySocialId(socialId: string) {
    const socialUser = await this.database.userSocial.findUnique({
      where: {
        socialId,
      },
      include: {
        user: true,
      },
    });

    if (!socialUser) {
      return undefined;
    }

    return socialUser.user;
  }

  async checkUserByPhoneNumber(phoneNumber: string) {
    const user = await this.database.user.findFirst({
      where: {
        phoneNumber,
      },
    });

    return user;
  }

  async createUser(data: Prisma.UserCreateInput) {
    const user = await this.database.user.create({
      data,
    });

    return user;
  }

  async updateUser(id: string, data: Prisma.UserUpdateInput) {
    await this.findUser(id);

    await this.database.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async deleteUser(id: string) {
    await this.findUser(id);

    await this.database.user.delete({
      where: {
        id,
      },
    });
  }
}
