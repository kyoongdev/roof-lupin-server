import { Injectable } from '@nestjs/common';

import { Category, Prisma, PublicTransportation, RentalType } from '@prisma/client';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import { SqlSpace } from '@/interface/space.interface';

import { RentalTypeRepository } from '../rental-type/rental-type.repository';

import { CreateSpaceDTO, SpaceDetailDTO, SpaceDTO, SpaceIdsDTO, UpdateSpaceDTO } from './dto';
import { BuildingDTO, CreateBuildingDTO } from './dto/facility';
import { CreateHashTagDTO, HashTagDTO } from './dto/hashTag';
import { RefundPolicyDTO } from './dto/refund';
import { SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';

@Injectable()
export class SpaceRepository {
  constructor(private readonly database: PrismaService, private readonly rentalTypeRepository: RentalTypeRepository) {}

  async findSpaceIds() {
    const spaces = await this.database.space.findMany({
      select: {
        id: true,
        title: true,
        thumbnail: true,
      },
    });

    return spaces.map((space) => new SpaceIdsDTO(space));
  }

  async findSpacesWithSQL(sql: Prisma.Sql, userId?: string) {
    const spaces: SqlSpace[] = await this.database.$queryRaw(sql);
    const count: {
      'FOUND_ROWS()': number;
    }[] = await this.database.$queryRaw(Prisma.sql`SELECT FOUND_ROWS()`);

    const data = await Promise.all(
      spaces.map(async (space) => {
        const publicTransportations: PublicTransportation[] = await this.database.$queryRaw(Prisma.sql`
          SELECT *
          FROM PublicTransportation pt
          WHERE pt.spaceId = ${space.id}
        `);
        const rentalType: RentalType[] = await this.database.$queryRaw(Prisma.sql`
          SELECT *
          FROM RentalType rt
          WHERE rt.spaceId = ${space.id}
        `);

        const categories: Category[] = await this.database.$queryRaw(Prisma.sql`
          SELECT *
          FROM Category c
          LEFT JOIN SpaceCategory sc ON sc.categoryId = c.id
          WHERE sc.spaceId = ${space.id}
        `);

        return new SpaceDTO({
          ...space,
          isApproved: space.isApproved === 1,
          isPublic: space.isPublic === 1,
          isImmediateReservation: space.isImmediateReservation === 1,
          isInterested: space.isInterest && Number(space.isInterest) === 1,
          interestCount: space.interestCount,
          location: {
            id: space.slId,
            lat: space.lat,
            lng: space.lng,
            roadAddress: space.roadAddress,
            jibunAddress: space.jibunAddress,
          },
          publicTransportations,
          rentalType,
          categories,
        });
      })
    );

    return {
      spaces: data,
      count: count[0]['FOUND_ROWS()'],
    };
  }

  async findSpace(id: string, userId?: string) {
    const space = await this.database.space.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            reviews: true,
            spaceQnAs: true,
          },
        },
        reviews: {
          include: {
            answers: {
              include: {
                host: true,
              },
            },
            images: {
              include: {
                image: true,
              },
            },

            user: true,
          },
          skip: 0,
          take: 3,
          orderBy: [
            {
              isBest: 'desc',
            },
            {
              createdAt: 'desc',
            },
          ],
        },
        categories: {
          include: {
            category: true,
          },
        },
        cautions: true,
        buildings: {
          include: {
            building: true,
          },
        },
        host: true,
        images: {
          include: {
            image: true,
          },
        },
        location: true,
        publicTransportations: true,
        refundPolicies: {
          orderBy: {
            daysBefore: 'asc',
          },
        },
        services: {
          include: {
            service: true,
          },
        },
        userInterests: true,
        sizes: true,
        openHours: true,
        holidays: true,
      },
    });

    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND());
    }

    const {
      cautions,
      categories,
      buildings,
      host,
      images,
      publicTransportations,
      services,
      userInterests,
      refundPolicies,
      openHours,
      holidays,
      reviews,
    } = space;
    const bestPhotos = await this.database.spaceReviewImage.findMany({
      where: {
        spaceReview: {
          spaceId: id,
          isBest: true,
        },
      },
      include: {
        image: true,
      },
    });

    return new SpaceDetailDTO({
      ...space,
      reviewCount: space._count.reviews,
      cautions: cautions.map((caution) => caution),
      categories: categories.map(({ category }) => category),
      buildings: buildings.map(({ building }) => building),
      host,
      images: images.map(({ image }) => image),
      publicTransportations: publicTransportations.map((publicTransportation) => publicTransportation),
      services: services.map(({ service }) => service),
      refundPolicies,
      isInterested: userInterests.some((userInterest) => userInterest.userId === userId),
      qnaCount: space._count.spaceQnAs,
      averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
      bestPhotos: bestPhotos.map((photo) => ({
        id: photo.image.id,
        url: photo.image.url,
      })),
      openHours,
      holidays,
      reviews: reviews.map((review) => ({
        ...review,
        images: review.images.map((image) => ({
          imageId: image.image.id,
          url: image.image.url,
          isBest: image.isBest,
        })),
      })),
    });
  }

  async findCommonSpace(id: string, userId?: string) {
    const space = await this.database.space.findUnique({
      where: {
        id,
      },
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
        reports: true,
      },
    });
    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND());
    }
    space.rentalType;
    return new SpaceDTO({
      ...space,
      reviewCount: space.reviews.length,
      location: space.location,
      averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
      isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
      categories: space.categories.map(({ category }) => category),
      reportCount: space.reports.length,
      interestCount: space.userInterests.length,
    });
  }

  async countSpaces(args = {} as Prisma.SpaceCountArgs) {
    return await this.database.space.count(args);
  }

  async countSpacesWithSQL(sql: Prisma.Sql) {
    const count = await this.database.$queryRaw(sql);

    return (count as any).length;
  }

  async findSpaces(args = {} as Prisma.SpaceFindManyArgs, userId?: string) {
    const spaces = await this.database.space.findMany({
      ...args,
      where: args.where,
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
        reports: true,
      },
      orderBy: {
        ...args.orderBy,
      },
    });

    //TODO: isBest는 어떻게 산정?
    return spaces.map(
      (space) =>
        new SpaceDTO({
          ...space,
          rentalType: space.rentalType,
          reviewCount: space.reviews.length,
          location: space.location,
          averageScore: space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length,
          isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
          categories: space.categories.map(({ category }) => category),
          reportCount: space.reports.length,
          interestCount: space.userInterests.length,
        })
    );
  }
  async findRefundPolicyBySpaceId(spaceId: string) {
    const refundPolicies = await this.database.refundPolicy.findMany({
      where: {
        spaceId,
      },
      orderBy: {
        daysBefore: 'asc',
      },
    });

    return refundPolicies.map((refundPolicy) => new RefundPolicyDTO(refundPolicy));
  }

  async createSpace(hostId: string, data: CreateSpaceDTO) {
    const {
      images,
      refundPolicies,
      cautions,
      rentalTypes,
      location: locationProps,
      buildings: buildingProps,
      services: servicesProps,
      categories: categoryProps,
      hashTags: hashTagProps,
      publicTransportations,
      sizes,
      openHours,
      holidays,

      ...rest
    } = data;

    data.validateRefundPolicies();

    const minSize = Math.min(...sizes.map((size) => size.size));

    const id = await this.database.$transaction(async (prisma) => {
      const buildings = await this.findOrCreateBuildings(prisma, buildingProps);

      const hashTags = await this.findOrCreateHashTags(prisma, hashTagProps);

      const space = await prisma.space.create({
        data: {
          ...rest,
          minSize,
          host: {
            connect: {
              id: hostId,
            },
          },
          images: {
            create: images.map((url) => ({
              image: {
                create: {
                  url,
                },
              },
            })),
          },

          refundPolicies: {
            create: refundPolicies.map((refundPolicy) => refundPolicy),
          },
          cautions: {
            create: cautions.map((caution) => caution),
          },

          buildings: {
            create: buildings.map((building) => ({
              buildingId: building.id,
            })),
          },
          services: {
            create: servicesProps.map((service) => ({
              serviceId: service,
            })),
          },
          categories: {
            create: categoryProps.map((category) => ({
              categoryId: category,
            })),
          },
          hashTags: {
            create: hashTags.map((hashTag) => ({
              hashTagId: hashTag.id,
            })),
          },
          publicTransportations: {
            create: publicTransportations.map((publicTransportation) => publicTransportation),
          },
          sizes: {
            create: sizes.map((size) => size),
          },
          location: {
            create: {
              ...locationProps,
            },
          },
          openHours: {
            create: openHours.map((openHour) => openHour),
          },
          ...(holidays && {
            holiday: {
              create: holidays.map((holiday) => holiday),
            },
          }),
        },
      });
      await this.rentalTypeRepository.createRentalTypes(prisma, space.id, rentalTypes);

      return space.id;
    });

    return id;
  }

  async updateSpace(spaceId: string, data: UpdateSpaceDTO) {
    const {
      images,
      refundPolicies,
      cautions,
      rentalTypes,
      location: locationProps,
      buildings: buildingProps,
      services: servicesProps,
      categories: categoryProps,
      hashTags: hashTagProps,
      publicTransportations,
      sizes,
      openHours,
      holidays,
      ...rest
    } = data;

    data.validateRefundPolicies();
    const updateArgs: Prisma.SpaceUpdateArgs = {
      where: {
        id: spaceId,
      },
      data: {
        ...rest,
      },
    };

    await this.database.$transaction(async (prisma) => {
      if (holidays) {
        updateArgs.data = {
          ...updateArgs.data,
          holidays: {
            create: holidays.map((holiday) => holiday),
            deleteMany: {},
          },
        };
      }

      if (openHours) {
        updateArgs.data = {
          ...updateArgs.data,
          openHours: {
            create: openHours.map((openHour) => openHour),
            deleteMany: {},
          },
        };
      }

      if (images) {
        updateArgs.data = {
          ...updateArgs.data,
          images: {
            create: images.map((url) => ({
              image: {
                create: {
                  url,
                },
              },
            })),
            deleteMany: {},
          },
        };
      }

      if (refundPolicies) {
        updateArgs.data = {
          ...updateArgs.data,
          refundPolicies: {
            create: refundPolicies.map((refundPolicy) => refundPolicy),
            deleteMany: {},
          },
        };
      }

      if (cautions) {
        updateArgs.data = {
          ...updateArgs.data,
          cautions: {
            create: cautions.map((caution) => caution),
            deleteMany: {},
          },
        };
      }

      if (rentalTypes) {
        await prisma.rentalType.deleteMany({
          where: {
            spaceId,
          },
        });

        await this.rentalTypeRepository.createRentalTypes(prisma, spaceId, rentalTypes);
      }

      if (locationProps) {
        updateArgs.data = {
          ...updateArgs.data,
          location: {
            create: {
              ...locationProps,
            },
            delete: true,
          },
        };
      }
      if (buildingProps) {
        const buildings = await this.findOrCreateBuildings(prisma, buildingProps);

        updateArgs.data = {
          ...updateArgs.data,
          buildings: {
            create: buildings.map((building) => ({
              buildingId: building.id,
            })),
            deleteMany: {},
          },
        };
      }

      if (servicesProps) {
        updateArgs.data = {
          ...updateArgs.data,
          services: {
            create: servicesProps.map((service) => ({
              serviceId: service,
            })),
            deleteMany: {},
          },
        };
      }

      if (categoryProps) {
        updateArgs.data = {
          ...updateArgs.data,
          categories: {
            create: categoryProps.map((category) => ({
              categoryId: category,
            })),
            deleteMany: {},
          },
        };
      }

      if (hashTagProps) {
        const hashTags = await this.findOrCreateHashTags(prisma, hashTagProps);

        updateArgs.data = {
          ...updateArgs.data,
          hashTags: {
            create: hashTags.map((hashTag) => ({
              hashTagId: hashTag.id,
            })),
            deleteMany: {},
          },
        };
      }

      if (publicTransportations) {
        updateArgs.data = {
          ...updateArgs.data,
          publicTransportations: {
            create: publicTransportations.map((publicTransportation) => publicTransportation),
            deleteMany: {},
          },
        };
      }

      if (sizes) {
        updateArgs.data = {
          ...updateArgs.data,
          sizes: {
            create: sizes.map((size) => size),
            deleteMany: {},
          },
        };
      }

      await prisma.space.update(updateArgs);
    });
  }

  async updateSpaceOrder(id: string, orderNo: number) {
    await this.database.$transaction(async (prisma) => {
      const space = await prisma.space.findUnique({
        where: {
          id,
        },
      });

      if (space.orderNo) {
        await prisma.space.updateMany({
          where: {
            ...(space.orderNo > orderNo
              ? {
                  AND: [
                    {
                      orderNo: {
                        lt: space.orderNo,
                      },
                    },
                    {
                      orderNo: {
                        gte: orderNo,
                      },
                    },
                  ],
                }
              : {
                  AND: [
                    {
                      orderNo: {
                        lte: orderNo,
                      },
                    },
                    {
                      orderNo: {
                        gt: space.orderNo,
                      },
                    },
                  ],
                }),
          },
          data: {
            orderNo: {
              ...(space.orderNo > orderNo
                ? {
                    increment: 1,
                  }
                : {
                    decrement: 1,
                  }),
            },
          },
        });
      }

      await prisma.space.update({
        where: {
          id,
        },
        data: {
          orderNo,
        },
      });
    });
  }

  async deleteSpaceOrder(id: string) {
    await this.database.space.update({
      where: {
        id,
      },
      data: {
        orderNo: null,
      },
    });
  }

  async deleteSpace(id: string) {
    await this.database.space.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteSpace(id: string) {
    await this.database.space.delete({
      where: {
        id,
      },
    });
  }

  async findOrCreateBuildings(prisma: TransactionPrisma, data: CreateBuildingDTO[]) {
    return await Promise.all(
      data.map(async (building) => {
        const isExist = await prisma.building.findFirst({
          where: {
            name: building.name,
          },
        });
        if (isExist) {
          return new BuildingDTO(isExist);
        }
        const newBuilding = await prisma.building.create({
          data: building,
        });
        return new BuildingDTO(newBuilding);
      })
    );
  }

  async findOrCreateHashTags(prisma: TransactionPrisma, data: CreateHashTagDTO[]) {
    return await Promise.all(
      data.map(async (hashTag) => {
        const isExist = await prisma.hashTag.findFirst({
          where: {
            name: hashTag.name,
          },
        });
        if (isExist) {
          return new HashTagDTO(isExist);
        }
        const newHashTag = await prisma.hashTag.create({
          data: hashTag,
        });
        return new HashTagDTO(newHashTag);
      })
    );
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
