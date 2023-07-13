import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';
import { SpaceRepository } from '../space/space.repository';

import { CreateHomeContentsDTO, HomeContentsDTO, UpdateHomeContentsDTO } from './dto';
import { HOME_CONTENTS_NOT_FOUND, HOME_ERROR_CODE } from './exception/errorCode';
import { HomeException } from './exception/home.exception';

@Injectable()
export class HomeService {
  constructor(private readonly database: PrismaService, private readonly spaceRepository: SpaceRepository) {}

  async getHomeContents(userId?: string) {
    const contents = await this.database.homeContents.findMany({
      include: {
        contentsCategories: {
          include: {
            spaces: {
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
              orderBy: {
                orderNo: 'asc',
              },
            },
          },
        },
        exhibitions: true,
        rankings: {
          include: {
            spaces: {
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
              orderBy: {
                orderNo: 'asc',
              },
            },
          },
        },
      },
      orderBy: {
        orderNo: 'asc',
      },
    });
    return contents.map(
      (content) =>
        new HomeContentsDTO({
          ...content,
          contentsCategories: content.contentsCategories.map((content) => ({
            ...content,
            spaces: content.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space, userId)),
          })),
          rankings: content.rankings.map((ranking) => ({
            ...ranking,
            spaces: ranking.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space, userId)),
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
    if (!category) {
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
