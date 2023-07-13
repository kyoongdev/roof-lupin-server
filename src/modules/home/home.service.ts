import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CategoryRepository } from '../category/category.repository';
import { ExhibitionRepository } from '../exhibition/exhibition.repository';
import { SpaceRepository } from '../space/space.repository';

import { CreateHomeContentsDTO, UpdateHomeContentsDTO } from './dto';
import { HOME_CONTENTS_NOT_FOUND, HOME_ERROR_CODE } from './exception/errorCode';
import { HomeException } from './exception/home.exception';

@Injectable()
export class HomeService {
  constructor(
    private readonly database: PrismaService,
    private readonly spaceRepository: SpaceRepository,
    private readonly exhibitionRepository: ExhibitionRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async findExhibitions() {
    return await this.exhibitionRepository.findExhibitions({
      where: {
        isShow: true,
      },
    });
  }

  async getHomeContents(userId?: string) {
    const contents = await this.categoryRepository.findContentCategories({}, userId);
    return contents;
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
