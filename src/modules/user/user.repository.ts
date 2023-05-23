import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'database/prisma.service';
import { PagingDTO } from 'wemacu-nestjs';
import { UserException } from './exception/user.exception';
import { USER_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaService) {}

  async findUsers(args = {} as Prisma.UserFindManyArgs) {
    const users = await this.database.user.findMany(args);

    return users;
  }

  async findUsersWithPaging(paging: PagingDTO, args = {} as Prisma.UserFindManyArgs) {
    const count = await this.database.user.count({
      where: args.where,
    });
    const rows = await this.database.user.findMany(args);

    return { count, rows };
  }

  async findUser(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND);
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
      throw new UserException(USER_ERROR_CODE.NOT_FOUND);
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
      throw new UserException(USER_ERROR_CODE.NOT_FOUND);
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
      throw new UserException(USER_ERROR_CODE.NOT_FOUND);
    }
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
