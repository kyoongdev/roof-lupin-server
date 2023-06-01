import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';

@Injectable()
export class SpaceRepository {
  constructor(private readonly database: PrismaService) {}

  async findSpace(id: string) {
    const space = await this.database.space.findUnique({
      where: {
        id,
      },
    });

    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND());
    }

    return space;
  }

  async createLike(userId: string, spaceId: string) {
    await this.database.spaceLike.create({
      data: {
        userId,
        spaceId,
      },
    });
  }

  async deleteLike(userId: string, spaceId: string) {
    await this.database.spaceLike.deleteMany({
      where: {
        userId,
        spaceId,
      },
    });
  }

  async checkIsLiked(userId: string, spaceId: string) {
    const like = await this.database.spaceLike.findFirst({
      where: {
        userId,
        spaceId,
      },
    });

    return like ? true : false;
  }
  async createInterest(userId: string, spaceId: string) {
    await this.database.spaceInterest.create({
      data: {
        userId,
        spaceId,
      },
    });
  }

  async deleteInterest(userId: string, spaceId: string) {
    await this.database.spaceInterest.deleteMany({
      where: {
        userId,
        spaceId,
      },
    });
  }

  async checkIsInterested(userId: string, spaceId: string) {
    const interest = await this.database.spaceInterest.findFirst({
      where: {
        userId,
        spaceId,
      },
    });

    return interest ? true : false;
  }
}
