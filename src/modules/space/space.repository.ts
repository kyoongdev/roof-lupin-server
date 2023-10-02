import { Injectable } from '@nestjs/common';

import { Prisma, PublicTransportation, RefundPolicy, RentalType } from '@prisma/client';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import { SqlSpace } from '@/interface/space.interface';

import { RentalTypeRepository } from '../rental-type/rental-type.repository';
import { ReviewDTO } from '../review/dto';

import { CreateSpaceDTO, SpaceDetailDTO, SpaceDTO, SpaceHashTagDTO, SpaceIdsDTO, UpdateSpaceDTO } from './dto';
import { BuildingDTO, CreateBuildingDTO } from './dto/building';
import { CreateHashTagDTO, HashTagDTO } from './dto/hashTag';
import { RefundPolicyDTO } from './dto/refund';
import { SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';

@Injectable()
export class SpaceRepository {
  constructor(private readonly database: PrismaService, private readonly rentalTypeRepository: RentalTypeRepository) {}

  async findSpaceIds(args = {} as Prisma.SpaceFindManyArgs) {
    const spaces = await this.database.space.findMany({
      where: args.where,
      select: {
        id: true,
        title: true,
        thumbnail: true,
        isMain: true,
      },
    });

    return spaces.map((space) => new SpaceIdsDTO(space));
  }

  async findSpacesWithSQL(sql: Prisma.Sql) {
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

        const categories = await this.database.spaceCategory.findMany({
          where: {
            spaceId: space.id,
          },
          include: {
            category: {
              include: {
                icons: {
                  include: {
                    icon: true,
                  },
                },
              },
            },
          },
          orderBy: {
            orderNo: 'asc',
          },
        });

        const refundPolicies: RefundPolicy[] = await this.database.$queryRaw(Prisma.sql`
          SELECT * 
          FROM RefundPolicy rp
          WHERE rp.spaceId = ${space.id}
        `);

        return new SpaceDTO({
          ...space,
          isApproved: space.isApproved === 1,
          isPublic: space.isPublic === 1,
          isImmediateReservation: space.isImmediateReservation === 1,
          isInterested: space.isInterest && Number(space.isInterest) === 1,
          isRoofOnly: space.isRoofOnly === 1,
          interestCount: space.interestCount,
          location: {
            id: space.slId,
            lat: space.lat,
            lng: space.lng,
            roadAddress: space.roadAddress,
            jibunAddress: space.jibunAddress,
            detailAddress: space.detailAddress,
          },
          publicTransportations,
          rentalType,
          categories: categories.map((category) => category.category),
          refundPolicies,
        });
      })
    );

    return {
      spaces: data,
      count: count[0]['FOUND_ROWS()'],
    };
  }
  async findSpaceHashTags(id: string) {
    const hashTags = await this.database.spaceHashTag.findMany({
      where: {
        spaceId: id,
      },
      include: {
        hashTag: true,
      },
    });

    return new SpaceHashTagDTO({
      hashTags: hashTags.map(({ hashTag }) => hashTag),
    });
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
          include: ReviewDTO.generateInclude(),
          skip: 0,
          take: 3,
          orderBy: [
            {
              createdAt: 'desc',
            },
          ],
        },
        categories: {
          include: {
            category: {
              include: {
                icons: {
                  include: {
                    icon: true,
                  },
                },
              },
            },
          },
        },
        buildings: {
          include: {
            building: {
              include: {
                icon: true,
              },
            },
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
            service: {
              include: {
                icons: {
                  include: {
                    icon: true,
                  },
                },
              },
            },
          },
        },
        userInterests: true,
        sizes: true,
        openHours: {
          orderBy: {
            day: 'asc',
          },
        },
        holidays: true,
      },
    });

    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.SPACE_NOT_FOUND);
    }

    const {
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
        isBest: true,
        spaceReview: {
          spaceId: id,
        },
      },
      include: {
        image: true,
      },
    });

    return new SpaceDetailDTO({
      ...space,
      reviewCount: space._count.reviews,
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
      reviews: reviews.map((review) => ReviewDTO.generateReviewDTO(review)),
    });
  }

  async findCommonSpace(id: string, userId?: string) {
    const space = await this.database.space.findUnique({
      where: {
        id,
      },
      include: SpaceDTO.generateSpaceInclude(),
    });
    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.SPACE_NOT_FOUND);
    }

    return new SpaceDTO(SpaceDTO.generateSpaceDTO(space, userId));
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
      include: SpaceDTO.generateSpaceInclude(),
      orderBy: {
        ...args.orderBy,
      },
    });

    //TODO: isBest는 어떻게 산정?
    return spaces.map((space) => new SpaceDTO(SpaceDTO.generateSpaceDTO(space, userId)));
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

    data.validateDTO();

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
            create: categoryProps.map((category) => category),
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

    data.validateDTO();
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
            create: categoryProps.map((category) => category),
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
          include: {
            icon: true,
          },
        });
        if (isExist) {
          return new BuildingDTO(isExist);
        }
        const newBuilding = await prisma.building.create({
          data: {
            name: building.name,
            icon: {
              connect: {
                id: building.iconId,
              },
            },
          },
          include: {
            icon: true,
          },
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

  async getMainSpace(hostId: string) {
    const space = await this.database.space.findFirst({
      where: {
        hostId,
        isMain: true,
      },
      include: {
        host: true,
      },
    });

    return space;
  }

  async setMainSpace(id: string) {
    await this.database.space.update({
      where: {
        id,
      },
      data: {
        isMain: true,
      },
    });
  }

  async unsetMainSpace(id: string) {
    await this.database.space.update({
      where: {
        id,
      },
      data: {
        isMain: false,
      },
    });
  }
}
