import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDetailDTO, SpaceDTO } from './dto';
import { SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';

@Injectable()
export class SpaceRepository {
  constructor(private readonly database: PrismaService) {}

  async findSpace(id: string, userId?: string) {
    const space = await this.database.space.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        cautions: true,
        facilities: {
          include: {
            facility: true,
          },
        },
        hashtags: {
          include: {
            hashtag: true,
          },
        },
        host: true,
        images: {
          include: {
            image: true,
          },
        },
        location: {
          include: {
            location: true,
          },
        },
        publicTransportations: true,
        refundPolicies: true,
        services: {
          include: {
            service: true,
          },
        },
        userInterests: true,
      },
    });

    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND());
    }
    const {
      cautions,
      categories,
      facilities,
      hashtags,
      host,
      images,
      location,
      publicTransportations,
      refundPolicies,
      services,
      userInterests,
    } = space;

    return new SpaceDetailDTO({
      ...space,
      reviewCount: space._count.reviews,
      cautions: cautions.map((caution) => caution),
      categories: categories.map(({ category }) => category),
      facilities: facilities.map(({ facility }) => facility),
      location: location?.location,
      hashtags: hashtags.map(({ hashtag }) => hashtag),
      host,
      images: images.map(({ image }) => image),
      publicTransportations: publicTransportations.map((publicTransportation) => publicTransportation),
      refundPolicies: refundPolicies.map((refundPolicy) => refundPolicy),
      services: services.map(({ service }) => service),
      isInterested: userInterests.some((userInterest) => userInterest.userId === userId),
      cost: space.minCost,
    });
  }

  async countSpaces(args = {} as Prisma.SpaceCountArgs) {
    return this.database.space.count(args);
  }

  async findSpaces(args = {} as Prisma.SpaceFindManyArgs) {
    const spaces = await this.database.space.findMany({
      where: args.where,
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      include: {
        location: {
          include: {
            location: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      ...args,
    });

    //TODO: isBest는 어떻게 산정?
    return spaces.map(
      (space) =>
        new SpaceDTO({
          ...space,
          cost: space.minCost,
          reviewCount: space._count.reviews,
          publicTransportation: space.publicTransportations.at(-1),
          location: space.location?.['location'],
        })
    );
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
