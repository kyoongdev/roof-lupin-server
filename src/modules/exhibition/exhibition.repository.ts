import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { FileService } from '../file/file.service';

import { CreateExhibitionDTO, ExhibitionDetailDTO, ExhibitionDTO, UpdateExhibitionDTO } from './dto';
import { EXHIBITION_ERROR_CODE, EXHIBITION_NOT_FOUND } from './exception/errorCode';
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
            coupon: {
              include: {
                couponCategories: {
                  include: {
                    category: true,
                  },
                },
              },
            },
          },
        },
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
        },
      },
    });

    if (!exhibition) throw new ExhibitionException(EXHIBITION_ERROR_CODE.NOT_FOUND(EXHIBITION_NOT_FOUND));

    return new ExhibitionDetailDTO({
      ...exhibition,
      spaces: exhibition.spaces.map(({ space }) => ({
        ...space,
        reviewCount: space.reviews.length,
        publicTransportation: space.publicTransportations?.at(-1),
        location: space.location,
        averageScore: Number(space.averageScore),
        isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
      })),
      coupons: exhibition.coupons.map(({ coupon }) => ({
        ...coupon,
        categories: coupon.couponCategories.map(({ category }) => category),
      })),
      images: exhibition.images.map(({ image }) => image),
    });
  }

  async countExhibitions(args: Prisma.ExhibitionCountArgs) {
    return this.database.exhibition.count(args);
  }

  async findExhibitions(args: Prisma.ExhibitionFindManyArgs) {
    const exhibitions = await this.database.exhibition.findMany(args);

    return exhibitions.map((exhibition) => new ExhibitionDTO(exhibition));
  }

  async createExhibition(data: CreateExhibitionDTO) {
    const { spaceIds, couponIds, images, ...rest } = data;
    const exhibition = await this.database.exhibition.create({
      data: {
        ...rest,
        spaces: {
          create: spaceIds.map((spaceId) => ({
            space: {
              connect: {
                id: spaceId,
              },
            },
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

  async updateExhibition(id: string, data: UpdateExhibitionDTO) {
    const { spaceIds, images, couponIds, ...rest } = data;
    const updateArgs: Prisma.ExhibitionUpdateArgs = {
      where: {
        id,
      },
      data: {
        ...rest,
      },
    };
    await this.database.$transaction(async (prisma) => {
      if (spaceIds) {
        await prisma.exhibitionSpace.deleteMany({
          where: {
            exhibitionId: id,
          },
        });
        updateArgs.data = {
          ...updateArgs.data,
          spaces: {
            create: spaceIds.map((spaceId) => ({
              space: {
                connect: {
                  id: spaceId,
                },
              },
            })),
          },
        };
      }

      if (couponIds) {
        await prisma.exhibitionCoupon.deleteMany({
          where: {
            exhibitionId: id,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          coupons: {
            create: couponIds.map((couponId) => ({
              coupon: {
                connect: {
                  id: couponId,
                },
              },
            })),
          },
        };
      }

      if (images) {
        await prisma.image.deleteMany({
          where: {
            exhibitionImages: {
              some: {
                exhibitionId: id,
              },
            },
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          images: {
            create: images.map((image) => ({
              image: {
                create: {
                  url: image,
                },
              },
            })),
          },
        };
      }
    });

    await this.database.exhibition.update(updateArgs);
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
}
