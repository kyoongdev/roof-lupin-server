import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';
import { CategoryRepository } from '@/modules/category/category.repository';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { CreateHomeContentsDTO, UpdateHomeContentsDTO } from '@/modules/home/dto';
import { HOME_CONTENT_DELETED, HOME_CONTENTS_NOT_FOUND, HOME_ERROR_CODE } from '@/modules/home/exception/errorCode';
import { HomeException } from '@/modules/home/exception/home.exception';
import { RankingRepository } from '@/modules/ranking/ranking.repository';
import { SpaceDTO } from '@/modules/space/dto';

import { AdminHomeContentDTO } from '../dto/home';

@Injectable()
export class AdminHomeService {
  constructor(
    private readonly database: PrismaService,
    private readonly categoryRepository: CategoryRepository,
    private readonly exhibitionRepository: ExhibitionRepository,
    private readonly rankingRepository: RankingRepository
  ) {}

  async findHomeContent(id: string) {
    const content = await this.database.homeContents.findUnique({
      where: {
        id,
      },
    });

    if (!content) {
      throw new HomeException(HOME_ERROR_CODE.NOT_FOUND(HOME_CONTENTS_NOT_FOUND));
    }
    return content;
  }

  async findHomeContents() {
    const contents = await this.database.homeContents.findMany({
      include: {
        contentsCategory: {
          include: {
            spaces: {
              include: {
                space: {
                  include: SpaceDTO.getSpacesIncludeOption(),
                },
              },
              orderBy: {
                orderNo: 'asc',
              },
            },
          },
        },
        exhibition: true,
        ranking: {
          include: {
            spaces: {
              include: {
                space: {
                  include: SpaceDTO.getSpacesIncludeOption(),
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
        new AdminHomeContentDTO({
          ...content,
          ...(content.contentsCategory && {
            contentsCategory: {
              ...content.contentsCategory,
              spaces: content.contentsCategory.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space)),
            },
          }),
          ...(content.ranking && {
            ranking: {
              ...content.ranking,
              spaces: content.ranking.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space)),
            },
          }),
          ...(content.exhibition && {
            exhibition: content.exhibition,
          }),
        })
    );
  }

  async createHomeContent(data: CreateHomeContentsDTO) {
    this.validateMutatingHomeContent(data);

    const content = await this.database.homeContents.create({
      data: {
        ...(data.contentCategoryId && {
          contentsCategory: {
            connect: {
              id: data.contentCategoryId,
            },
          },
        }),
        ...(data.exhibitionId && {
          exhibition: {
            connect: {
              id: data.exhibitionId,
            },
          },
        }),
        ...(data.rankingId && {
          ranking: {
            connect: {
              id: data.rankingId,
            },
          },
        }),
      },
    });
    return content;
  }

  async updateHomeContent(id: string, data: UpdateHomeContentsDTO) {
    const isExist = await this.findHomeContent(id);
    await this.validateMutatingHomeContent(data);

    await this.database.$transaction(async (prisma) => {
      await prisma.homeContents.updateMany({
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
      await prisma.homeContents.update({
        where: {
          id,
        },
        data: {
          orderNo: data.orderNo,
          ...(data.contentCategoryId && {
            contentsCategory: {
              connect: {
                id: data.contentCategoryId,
              },
            },
          }),
          ...(data.exhibitionId && {
            exhibition: {
              connect: {
                id: data.exhibitionId,
              },
            },
          }),
          ...(data.rankingId && {
            ranking: {
              connect: {
                id: data.rankingId,
              },
            },
          }),
        },
      });
    });
  }

  async deleteHomeContent(id: string) {
    const homeContent = await this.findHomeContent(id);
    await this.database.homeContents.updateMany({
      where: {
        orderNo: {
          gt: homeContent.orderNo,
        },
      },
      data: {
        orderNo: {
          decrement: 1,
        },
      },
    });
    await this.database.homeContents.delete({
      where: {
        id,
      },
    });
  }

  async validateMutatingHomeContent(data: CreateHomeContentsDTO | UpdateHomeContentsDTO) {
    if (data.contentCategoryId) {
      const contentCategory = await this.categoryRepository.findContentCategory(data.contentCategoryId);
      if (contentCategory.deletedAt) {
        throw new BadRequestException(HOME_CONTENT_DELETED);
      }
    }
    if (data.exhibitionId) {
      const exhibition = await this.exhibitionRepository.findExhibition(data.exhibitionId);

      if (exhibition.deletedAt) {
        throw new BadRequestException(HOME_CONTENT_DELETED);
      }
    }

    if (data.rankingId) {
      const ranking = await this.rankingRepository.findRanking(data.rankingId);
      if (ranking.deletedAt) {
        throw new BadRequestException(HOME_CONTENT_DELETED);
      }
    }
  }
}
