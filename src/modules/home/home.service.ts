import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';
import { SpaceRepository } from '../space/space.repository';

import { HomeContentsDTO } from './dto';
import { HOME_CONTENTS_NOT_FOUND, HOME_ERROR_CODE } from './exception/errorCode';
import { HomeException } from './exception/home.exception';

@Injectable()
export class HomeService {
  constructor(private readonly database: PrismaService, private readonly spaceRepository: SpaceRepository) {}

  async getHomeContents(userId?: string) {
    const contents = await this.database.homeContents.findMany({
      include: {
        contentsCategory: {
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
                    categories: {
                      include: {
                        category: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                orderNo: 'asc',
              },
            },
          },
        },
        exhibition: {
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
                    categories: {
                      include: {
                        category: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                orderNo: 'asc',
              },
            },
          },
        },
        ranking: {
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
                    categories: {
                      include: {
                        category: true,
                      },
                    },
                  },
                },
              },
              orderBy: {
                orderNo: 'asc',
              },
              skip: 0,
              take: 3,
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
          ...(content.contentsCategory && {
            contentsCategory: {
              ...content.contentsCategory,
              spaces: content.contentsCategory.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space, userId)),
            },
          }),
          ...(content.ranking && {
            ranking: {
              ...content.ranking,
              spaces: content.ranking.spaces.map((space) => SpaceDTO.generateSpaceDTO(space.space, userId)),
            },
          }),
          ...(content.exhibition && {
            exhibition: content.exhibition,
          }),
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
}
