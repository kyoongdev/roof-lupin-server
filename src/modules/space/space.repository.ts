import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDetailDTO } from './dto';
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
        spaceQnAs: {
          include: {
            user: true,
            answers: {
              include: {
                host: true,
              },
            },
          },
        },
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
      spaceQnAs,
    } = space;

    return new SpaceDetailDTO({
      ...space,
      reviewCount: space._count.reviews,
      cautions: cautions.map((caution) => caution),
      categories: categories.map(({ category }) => category),
      facilities: facilities.map(({ facility }) => facility),
      location: location.location,
      hashtags: hashtags.map(({ hashtag }) => hashtag),
      host,
      images: images.map(({ image }) => image),
      publicTransportations: publicTransportations.map((publicTransportation) => publicTransportation),
      refundPolicies: refundPolicies.map((refundPolicy) => refundPolicy),
      services: services.map(({ service }) => service),
      isInterested: userInterests.some((userInterest) => userInterest.userId === userId),
      qnas: spaceQnAs.map((spaceQnA) => spaceQnA),
      cost: space.minCost,
    });
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
