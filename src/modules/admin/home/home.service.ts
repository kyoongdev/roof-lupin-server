import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';
import { CategoryRepository } from '@/modules/category/category.repository';
import { ExhibitionRepository } from '@/modules/exhibition/exhibition.repository';
import { CreateHomeContentsDTO, UpdateHomeContentsDTO } from '@/modules/home/dto';
import { HOME_AT_LEAST_ONE_TARGET, HOME_CONTENTS_NOT_FOUND, HOME_ERROR_CODE } from '@/modules/home/exception/errorCode';
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
        new AdminHomeContentDTO({
          ...content,
          contentsCategories: content.contentsCategories.map((content) => ({
            ...content,
            spaces: content.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space)),
          })),
          rankings: content.rankings.map((ranking) => ({
            ...ranking,
            spaces: ranking.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space)),
          })),
        })
    );
  }

  async createHomeContent(data: CreateHomeContentsDTO) {
    this.validateMutatingHomeContent(data);

    const content = await this.database.homeContents.create({
      data: {
        orderNo: data.orderNo,
        ...(data.contentCategoryId && {
          contentsCategories: {
            connect: {
              id: data.contentCategoryId,
            },
          },
        }),
        ...(data.exhibitionId && {
          exhibitions: {
            connect: {
              id: data.exhibitionId,
            },
          },
        }),
        ...(data.rankingId && {
          rankings: {
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
    await this.findHomeContent(id);
    this.validateMutatingHomeContent(data);

    await this.database.homeContents.update({
      where: {
        id,
      },
      data: {
        orderNo: data.orderNo,
        ...(data.contentCategoryId && {
          contentsCategories: {
            connect: {
              id: data.contentCategoryId,
            },
          },
        }),
        ...(data.exhibitionId && {
          exhibitions: {
            connect: {
              id: data.exhibitionId,
            },
          },
        }),
        ...(data.rankingId && {
          rankings: {
            connect: {
              id: data.rankingId,
            },
          },
        }),
      },
    });
  }

  async deleteHomeContent(id: string) {
    await this.findHomeContent(id);
    await this.database.homeContents.delete({
      where: {
        id,
      },
    });
  }

  async validateMutatingHomeContent(data: CreateHomeContentsDTO | UpdateHomeContentsDTO) {
    const targets = [data.contentCategoryId, data.exhibitionId, data.rankingId];

    if (targets.filter(Boolean).length !== 1) {
      throw new HomeException(HOME_ERROR_CODE.BAD_REQUEST(HOME_AT_LEAST_ONE_TARGET));
    }

    if (data.contentCategoryId) {
      await this.categoryRepository.findContentCategory(data.contentCategoryId);
    }
    if (data.exhibitionId) {
      await this.exhibitionRepository.findExhibition(data.exhibitionId);
    }

    if (data.rankingId) {
      await this.rankingRepository.findRanking(data.rankingId);
    }
  }
}
