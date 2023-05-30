import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { CommonUserDTO, CreateSocialUserDTO, CreateUserDTO, UpdateUserDTO } from './dto';
import { HARD_DELETE_FAILED, SOCIAL_USER_NOT_FOUND, USER_ALREADY_EXIST, USER_ERROR_CODE } from './exception/errorCode';
import { UserException } from './exception/user.exception';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaService) {}

  async findUsers(args = {} as Prisma.UserFindManyArgs) {
    const users = await this.database.user.findMany(args);

    return users.map((user) => new CommonUserDTO(user));
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

    return new CommonUserDTO(user);
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

    return new CommonUserDTO(user);
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
    return new CommonUserDTO(user);
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
    return new CommonUserDTO(user);
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

    return new CommonUserDTO(socialUser.user);
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

    return new CommonUserDTO(socialUser.user);
  }

  async checkUserByPhoneNumber(phoneNumber: string) {
    const user = await this.database.user.findFirst({
      where: {
        phoneNumber,
      },
    });

    return user;
  }

  async createUser(data: CreateUserDTO) {
    const user = await this.database.user.create({
      data,
    });

    return user;
  }
  async createSocialUser(props: CreateSocialUserDTO) {
    const { socialId, socialType, ...rest } = props;
    const isExist = await this.checkUserBySocialId(socialId);

    if (isExist) {
      throw new UserException(USER_ERROR_CODE.CONFLICT(USER_ALREADY_EXIST));
    }
    const newUser = await this.database.user.create({
      data: {
        ...rest,
        socials: {
          create: {
            socialId,
            socialType,
          },
        },
      },
    });

    return newUser.id;
  }

  async updateUser(id: string, data: UpdateUserDTO) {
    await this.database.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async hardDeleteUser(id: string) {
    const user = await this.findUser(id);

    if (user.deletedAt) {
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
}
