import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { CommonUserDTO, CreateSocialUserDTO, PushTokenDTO, UpdateUserDTO } from './dto';
import { UpdateUserSettingDTO } from './dto/setting';
import { SOCIAL_USER_NOT_FOUND, USER_ALREADY_EXIST, USER_ERROR_CODE } from './exception/errorCode';
import { UserException } from './exception/user.exception';

@Injectable()
export class UserRepository {
  constructor(private readonly database: PrismaService) {}

  async findUser(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
      include: {
        socials: true,
        setting: true,
      },
    });

    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND());
    }

    return new CommonUserDTO(user);
  }

  async findUserPushToken(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
      include: {
        setting: true,
      },
    });

    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND());
    }

    return new PushTokenDTO(user);
  }

  async findUserByEmail(email: string) {
    const user = await this.database.user.findFirst({
      where: {
        email,
      },
      include: {
        socials: true,
        setting: true,
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
      include: {
        socials: true,
        setting: true,
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
        user: {
          include: {
            socials: true,
          },
        },
      },
    });

    if (!socialUser) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND(SOCIAL_USER_NOT_FOUND));
    }

    return socialUser.user;
  }

  async checkUserIsBlocked(id: string) {
    const user = await this.database.user.findUnique({
      where: {
        id,
      },
      select: {
        isBlocked: true,
        unBlockAt: true,
      },
    });

    if (!user) {
      throw new UserException(USER_ERROR_CODE.NOT_FOUND());
    }

    return user;
  }

  async checkUserBySocialId(socialId: string) {
    const socialUser = await this.database.userSocial.findUnique({
      where: {
        socialId,
      },
      include: {
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
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
        setting: {
          create: {},
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

  async updateSetting(userId: string, data: UpdateUserSettingDTO) {
    await this.database.userSetting.update({
      where: {
        userId,
      },
      data,
    });
  }

  async login(id: string) {
    await this.database.user.update({
      where: {
        id,
      },
      data: {
        loginedAt: new Date(),
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
