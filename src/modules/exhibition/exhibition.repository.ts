import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import {
  CreateExhibitionDTO,
  CreateExhibitionSpaceDTO,
  ExhibitionDetailDTO,
  ExhibitionDTO,
  UpdateExhibitionDTO,
  UpdateExhibitionOrderDTO,
  UpdateExhibitionSpaceDTO,
} from './dto';
import { EXHIBITION_ERROR_CODE, EXHIBITION_NOT_FOUND, EXHIBITION_SPACE_NOT_FOUND } from './exception/errorCode';
import { ExhibitionException } from './exception/exhibition.exception';

@Injectable()
export class ExhibitionRepository {
  constructor(private readonly database: PrismaService) {}

  async findExhibition(id: string, userId?: string) {
    const exhibition = await this.database.exhibition.findUnique({
      where: {
        id,
      },
      include: {
        images: {
          include: {
            image: true,
          },
        },
        coupons: {
          include: {
            coupon: true,
          },
        },
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
    });

    if (!exhibition) throw new ExhibitionException(EXHIBITION_ERROR_CODE.NOT_FOUND(EXHIBITION_NOT_FOUND));

    return new ExhibitionDetailDTO({
      ...exhibition,
      spaces: exhibition.spaces.map(({ space }) => SpaceDTO.generateSpaceDTO(space, userId)),
      coupons: exhibition.coupons.map(({ coupon }) => coupon),
      images: exhibition.images.map(({ image }) => image),
    });
  }

  async countExhibitions(args = {} as Prisma.ExhibitionCountArgs) {
    return this.database.exhibition.count(args);
  }

  async findExhibitions(args = {} as Prisma.ExhibitionFindManyArgs) {
    const exhibitions = await this.database.exhibition.findMany({
      ...args,
      where: args.where,
    });

    return exhibitions.map((exhibition) => new ExhibitionDTO(exhibition));
  }

  async createExhibition(data: CreateExhibitionDTO) {
    const { spaces, couponIds, images, ...rest } = data;
    const exhibition = await this.database.exhibition.create({
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
        coupons: {
          create: couponIds.map((couponId) => ({
            coupon: {
              connect: {
                id: couponId,
              },
            },
          })),
        },
        images: {
          create: images.map((image) => ({
            image: {
              create: {
                url: image,
              },
            },
          })),
        },
      },
    });

    return exhibition.id;
  }

  async createExhibitionSpace(exhibitionId: string, data: CreateExhibitionSpaceDTO) {
    await this.database.$transaction(async (prisma) => {
      await prisma.exhibitionSpace.updateMany({
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

      await prisma.exhibitionSpace.create({
        data: {
          orderNo: data.orderNo,
          exhibition: {
            connect: {
              id: exhibitionId,
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

  async updateExhibition(id: string, data: UpdateExhibitionDTO) {
    const { spaces, images, couponIds, ...rest } = data;

    await this.database.exhibition.update({
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
        ...(couponIds && {
          coupons: {
            deleteMany: {},
            create: couponIds.map((couponId) => ({
              coupon: {
                connect: {
                  id: couponId,
                },
              },
            })),
          },
        }),
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((image) => ({
              image: {
                create: {
                  url: image,
                },
              },
            })),
          },
        }),
      },
    });
  }

  async updateExhibitionSpace(id: string, data: UpdateExhibitionSpaceDTO) {
    await this.database.$transaction(async (prisma) => {
      const isExist = await prisma.exhibitionSpace.findUnique({
        where: {
          exhibitionId_spaceId: {
            exhibitionId: id,
            spaceId: data.spaceId,
          },
        },
      });
      if (!isExist) throw new ExhibitionException(EXHIBITION_ERROR_CODE.NOT_FOUND(EXHIBITION_SPACE_NOT_FOUND));

      await prisma.exhibitionSpace.updateMany({
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
      await prisma.exhibitionSpace.update({
        where: {
          exhibitionId_spaceId: {
            exhibitionId: id,
            spaceId: data.spaceId,
          },
        },
        data,
      });
    });
  }

  async deleteExhibition(id: string) {
    await this.database.image.deleteMany({
      where: {
        exhibitionImages: {
          some: {
            exhibitionId: id,
          },
        },
      },
    });

    await this.database.exhibition.delete({
      where: {
        id,
      },
    });
  }

  async deleteExhibitionSpace(id: string, spaceId: string) {
    await this.database.$transaction(async (prisma) => {
      const isExist = await prisma.exhibitionSpace.findUnique({
        where: {
          exhibitionId_spaceId: {
            exhibitionId: id,
            spaceId,
          },
        },
      });
      if (!isExist) throw new ExhibitionException(EXHIBITION_ERROR_CODE.NOT_FOUND(EXHIBITION_SPACE_NOT_FOUND));

      await prisma.exhibitionSpace.updateMany({
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

      await prisma.exhibitionSpace.delete({
        where: {
          exhibitionId_spaceId: {
            exhibitionId: id,
            spaceId,
          },
        },
      });
    });
  }
}
