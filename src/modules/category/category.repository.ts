import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import {
  CategoryDTO,
  CreateCategoryDTO,
  CreateContentCategoryDTO,
  CreateContentCategorySpaceDTO,
  UpdateCategoryDTO,
  UpdateContentCategoryDTO,
  UpdateContentCategorySpaceDTO,
} from './dto';
import { ContentCategoryDTO } from './dto/content-category.dto';
import { CategoryException } from './exception/category.exception';
import { CATEGORY_ERROR_CODE } from './exception/errorCode';

@Injectable()
export class CategoryRepository {
  constructor(private readonly database: PrismaService) {}

  async findCategory(id: string) {
    const category = await this.database.category.findUnique({
      where: {
        id,
      },
      include: {
        icons: {
          include: {
            icon: true,
          },
        },
      },
    });

    if (!category) {
      throw new CategoryException(CATEGORY_ERROR_CODE.CATEGORY_NOT_FOUND);
    }
    return new CategoryDTO(category);
  }

  async countCategories(args = {} as Prisma.CategoryCountArgs) {
    return await this.database.category.count(args);
  }

  async findCategories(args = {} as Prisma.CategoryFindManyArgs) {
    const categories = await this.database.category.findMany({
      ...args,
      include: {
        icons: {
          include: {
            icon: true,
          },
        },
      },
    });

    return categories.map((category) => new CategoryDTO(category));
  }

  async findContentCategory(id: string) {
    const category = await this.database.contentCategory.findUnique({
      where: {
        id,
      },
      include: {
        spaces: {
          include: {
            space: {
              include: SpaceDTO.generateSpaceInclude(),
            },
          },
          orderBy: {
            orderNo: 'asc',
          },
        },
      },
    });

    if (!category) {
      throw new CategoryException(CATEGORY_ERROR_CODE.CONTENT_CATEGORY_NOT_FOUND);
    }

    return new ContentCategoryDTO({
      ...category,
      spaces: category.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space)),
    });
  }

  async countContentCategories(args = {} as Prisma.ContentCategoryCountArgs) {
    return await this.database.contentCategory.count(args);
  }

  async findContentCategories(args = {} as Prisma.ContentCategoryFindManyArgs, userId?: string) {
    const contentCategories = await this.database.contentCategory.findMany({
      ...args,
      where: args.where,
      include: {
        spaces: {
          include: {
            space: {
              include: SpaceDTO.generateSpaceInclude(),
            },
          },
          orderBy: {
            orderNo: 'asc',
          },
        },
      },
    });

    return contentCategories.map(
      (contentCategory) =>
        new ContentCategoryDTO({
          ...contentCategory,
          spaces: contentCategory.spaces.map(({ space }) => SpaceDTO.generateSpaceDTO(space)),
        })
    );
  }

  async createCategory(data: CreateCategoryDTO) {
    const { icons, ...rest } = data;
    const category = await this.database.category.create({
      data: {
        ...rest,
        ...(icons && {
          icons: {
            create: icons.map((icon) => ({
              isMapIcon: icon.isMapIcon,
              icon: {
                connect: {
                  id: icon.iconId,
                },
              },
            })),
          },
        }),
      },
    });

    return category.id;
  }

  async createContentCategory(data: CreateContentCategoryDTO) {
    const { spaces, ...rest } = data;
    const category = await this.database.contentCategory.create({
      data: {
        ...rest,
        spaces: {
          create: spaces.map((space) => ({
            space: {
              connect: {
                id: space.spaceId,
              },
            },
            orderNo: space.orderNo,
          })),
        },
      },
    });

    return category.id;
  }

  async createContentCategorySpace(categoryId: string, data: CreateContentCategorySpaceDTO) {
    await this.database.$transaction(async (prisma) => {
      await prisma.contentCategorySpace.updateMany({
        where: {
          orderNo: {
            gte: data.orderNo,
          },
        },
        data: {
          orderNo: {
            increment: 1,
          },
        },
      });

      await prisma.contentCategorySpace.create({
        data: {
          orderNo: data.orderNo,
          contentCategory: {
            connect: {
              id: categoryId,
            },
          },
          space: {
            connect: {
              id: data.spaceId,
            },
          },
        },
      });
    });
  }

  async updateCategory(id: string, data: UpdateCategoryDTO) {
    const { icons, ...rest } = data;

    await this.database.category.update({
      where: {
        id,
      },
      data: {
        ...rest,
        ...(icons &&
          icons.length > 0 && {
            icons: {
              deleteMany: {},
              create: icons.map((icon) => ({
                isMapIcon: icon.isMapIcon,
                icon: {
                  connect: {
                    id: icon.iconId,
                  },
                },
              })),
            },
          }),
      },
    });
  }

  async updateContentCategory(id: string, data: UpdateContentCategoryDTO) {
    const { spaces, ...rest } = data;

    await this.database.contentCategory.update({
      where: {
        id,
      },
      data: {
        ...rest,
        ...(spaces && {
          spaces: {
            deleteMany: {},
            create: spaces.map((space) => ({
              space: {
                connect: {
                  id: space.spaceId,
                },
              },
              orderNo: space.orderNo,
            })),
          },
        }),
      },
    });
  }

  async updateContentCategorySpace(categoryId: string, data: UpdateContentCategorySpaceDTO) {
    await this.database.$transaction(async (prisma) => {
      const isExist = await prisma.contentCategorySpace.findUnique({
        where: {
          contentCategoryId_spaceId: {
            contentCategoryId: categoryId,
            spaceId: data.spaceId,
          },
        },
      });
      if (!isExist) {
        throw new CategoryException(CATEGORY_ERROR_CODE.CONTENT_CATEGORY_SPACE_NOT_FOUND);
      }

      await prisma.contentCategorySpace.updateMany({
        where: {
          ...(isExist.orderNo > data.orderNo
            ? {
                AND: [
                  {
                    orderNo: {
                      lt: isExist.orderNo,
                    },
                  },
                  {
                    orderNo: {
                      gte: data.orderNo,
                    },
                  },
                ],
              }
            : {
                AND: [
                  {
                    orderNo: {
                      lte: data.orderNo,
                    },
                  },
                  {
                    orderNo: {
                      gt: isExist.orderNo,
                    },
                  },
                ],
              }),
        },
        data: {
          orderNo: {
            ...(isExist.orderNo > data.orderNo
              ? {
                  increment: 1,
                }
              : {
                  decrement: 1,
                }),
          },
        },
      });
      await prisma.contentCategorySpace.update({
        where: {
          contentCategoryId_spaceId: {
            contentCategoryId: categoryId,
            spaceId: data.spaceId,
          },
        },
        data,
      });
    });
  }

  async deleteCategory(id: string) {
    await this.database.category.delete({
      where: {
        id,
      },
    });
  }

  async deleteContentCategory(id: string) {
    await this.database.contentCategory.update({
      where: {
        id,
      },
      data: {
        deletedAt: null,
      },
    });
  }
  async hardDeleteContentCategory(id: string) {
    await this.database.contentCategory.delete({
      where: {
        id,
      },
    });
  }

  async deleteContentCategorySpace(categoryId: string, spaceId: string) {
    await this.database.$transaction(async (prisma) => {
      const isExist = await prisma.contentCategorySpace.findUnique({
        where: {
          contentCategoryId_spaceId: {
            contentCategoryId: categoryId,
            spaceId,
          },
        },
      });

      if (!isExist) {
        throw new CategoryException(CATEGORY_ERROR_CODE.CONTENT_CATEGORY_SPACE_NOT_FOUND);
      }

      await prisma.contentCategorySpace.updateMany({
        where: {
          orderNo: {
            gt: isExist.orderNo,
          },
        },
        data: {
          orderNo: {
            decrement: 1,
          },
        },
      });
      await prisma.contentCategorySpace.delete({
        where: {
          contentCategoryId_spaceId: {
            contentCategoryId: categoryId,
            spaceId,
          },
        },
      });
    });
  }
}
