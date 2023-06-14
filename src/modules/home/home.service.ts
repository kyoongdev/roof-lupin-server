import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { Cache } from 'cache-manager';

import { PrismaService } from '@/database/prisma.service';
import { CacheDecoratorTest } from '@/utils/cache/decorator';

import { SpaceRepository } from '../space/space.repository';

import { CreateHomeContentsDTO, HomeContentsDTO, UpdateHomeContentsDTO } from './dto';
import { HOME_CONTENTS_NOT_FOUND, HOME_ERROR_CODE } from './exception/errorCode';
import { HomeException } from './exception/home.exception';

@Injectable()
export class HomeService {
  constructor(
    private readonly database: PrismaService,
    private readonly spaceRepository: SpaceRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async getHomeContents(userId?: string) {
    const categories = await this.database.category.findMany({
      where: {
        isContent: true,
      },
      include: {
        spaceUsageCategories: {
          include: {
            space: {
              include: {
                location: true,
                reviews: true,
                publicTransportations: true,
                userInterests: true,
                rentalType: true,
              },
            },
          },
        },
      },
    });
    // await this.cacheManager.set('HOME_CONTENTS', categories, 30);
    // console.log(await this.cacheManager.get('HOME_CONTENTS'));
    return categories.map(
      (category) =>
        new HomeContentsDTO({
          id: category.id,
          name: category.name,
          highlight: category.highlight,
          spaces: category.spaceUsageCategories.map(({ space }) => ({
            ...space,
            cost: space.minCost,
            reviewCount: space.reviews.length,
            publicTransportation: space.publicTransportations?.at(-1),
            location: space.location,
            averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
            isInterested: space.userInterests.some((interest) => interest.userId === userId),
          })),
        })
    );
  }

  async findHomeContents(id: string) {
    const category = await this.database.category.findUnique({
      where: {
        id,
      },
    });
    if (!category || category.isContent === false) {
      throw new HomeException(HOME_ERROR_CODE.NOT_FOUND(HOME_CONTENTS_NOT_FOUND));
    }

    return category;
  }

  async createHomeContents(data: CreateHomeContentsDTO) {
    await Promise.all(
      data.spaceIds.map(async (id) => {
        await this.spaceRepository.findSpace(id);
      })
    );
    const homeContents = await this.database.category.create({
      data: {
        name: data.name,
        highlight: data.highlight,
        isContent: true,
        spaceUsageCategories: {
          create: data.spaceIds.map((id) => ({
            space: {
              connect: {
                id,
              },
            },
          })),
        },
      },
    });
    return homeContents.id;
  }

  async updateHomeContents(id: string, data: UpdateHomeContentsDTO) {
    await this.findHomeContents(id);
    const updateArgs: Prisma.CategoryUpdateArgs = {
      where: {
        id,
      },
      data: {
        name: data.name,
        highlight: data.highlight,
      },
    };

    if (data.spaceIds) {
      await Promise.all(
        data.spaceIds.map(async (id) => {
          await this.spaceRepository.findSpace(id);
        })
      );
      updateArgs.data = {
        ...updateArgs.data,
        spaceUsageCategories: {
          deleteMany: {},
          create: data.spaceIds.map((id) => ({
            space: {
              connect: {
                id,
              },
            },
          })),
        },
      };
    }
    await this.database.category.update(updateArgs);
  }

  async deleteHomeContents(id: string) {
    await this.findHomeContents(id);
    await this.database.category.delete({
      where: {
        id,
      },
    });
  }
}
