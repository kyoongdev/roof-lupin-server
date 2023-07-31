import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { flatMap } from 'lodash';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';

import { CreateSpaceDTO, SpaceDetailDTO, SpaceDTO, SpaceIdsDTO, UpdateSpaceDTO } from './dto';
import { CreateSpaceCategoryDTO, SpaceCategoryDTO } from './dto/category';
import { BuildingDTO, CreateBuildingDTO } from './dto/facility';
import { CreateHashTagDTO, HashTagDTO } from './dto/hashTag';
import { RefundPolicyDTO } from './dto/refund';
import { CreateServiceDTO, ServiceDTO } from './dto/service';
import { SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';
import { RentalTypeRepository } from './rental-type/rental-type.repository';

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

  async findSpacesWithSQL(sql: Prisma.Sql) {
    const spaces: any[] = await this.database.$queryRaw(sql);

    const data = await Promise.all(
      spaces.map(async (space) => {
        const publicTransportations = await this.database.publicTransportation.findMany({
          where: {
            spaceId: space.id,
          },
        });
        const rentalType = await this.database.rentalType.findMany({
          where: {
            spaceId: space.id,
          },
        });

        return new SpaceDTO({
          ...space,
          location: {
            id: space.slId,
            lat: space.lat,
            lng: space.lng,
            roadAddress: space.roadAddress,
            jibunAddress: space.jibunAddress,
          },
          publicTransportations,
          rentalType,
        });
      })
    );

    return data;
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
      where: args.where,
      include: {
        location: true,
        reviews: true,
        publicTransportations: true,
        userInterests: true,
        rentalType: true,
      },
      orderBy: {
        ...args.orderBy,
      },
      ...args,
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
      const services = await this.findOrCreateServices(prisma, servicesProps);
      const categories = await this.findOrCreateCategories(prisma, categoryProps);
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
            create: services.map((service) => ({
              serviceId: service.id,
            })),
          },
          categories: {
            create: categories.map((category) => ({
              categoryId: category.id,
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
        await prisma.spaceHoliday.deleteMany({
          where: {
            spaceId,
          },
        });
        updateArgs.data = {
          ...updateArgs.data,
          holidays: {
            create: holidays.map((holiday) => holiday),
          },
        };
      }

      if (openHours) {
        await prisma.openHour.deleteMany({
          where: {
            spaceId,
          },
        });
        updateArgs.data = {
          ...updateArgs.data,
          openHours: {
            create: openHours.map((openHour) => openHour),
          },
        };
      }

      if (images) {
        await prisma.image.deleteMany({
          where: {
            spaceImages: {
              some: {
                spaceId,
              },
            },
          },
        });

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
          },
        };
      }

      if (refundPolicies) {
        await prisma.refundPolicy.deleteMany({
          where: {
            spaceId,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          refundPolicies: {
            create: refundPolicies.map((refundPolicy) => refundPolicy),
          },
        };
      }

      if (cautions) {
        await prisma.spaceCaution.deleteMany({
          where: {
            spaceId,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          cautions: {
            create: cautions.map((caution) => caution),
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
        await prisma.spaceLocation.deleteMany({
          where: {
            spaceId,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          location: {
            create: {
              ...locationProps,
            },
          },
        };
      }
      if (buildingProps) {
        await prisma.spaceBuilding.deleteMany({
          where: {
            spaceId,
          },
        });

        const buildings = await this.findOrCreateBuildings(prisma, buildingProps);

        updateArgs.data = {
          ...updateArgs.data,
          buildings: {
            create: buildings.map((building) => ({
              buildingId: building.id,
            })),
          },
        };
      }

      if (servicesProps) {
        await prisma.spaceService.deleteMany({
          where: {
            spaceId,
          },
        });

        const services = await this.findOrCreateServices(prisma, servicesProps);

        updateArgs.data = {
          ...updateArgs.data,
          services: {
            create: services.map((service) => ({
              serviceId: service.id,
            })),
          },
        };
      }

      if (categoryProps) {
        await prisma.spaceCategory.deleteMany({
          where: {
            spaceId,
          },
        });

        const categories = await this.findOrCreateCategories(prisma, categoryProps);

        updateArgs.data = {
          ...updateArgs.data,
          categories: {
            create: categories.map((category) => ({
              categoryId: category.id,
            })),
          },
        };
      }

      if (hashTagProps) {
        await prisma.spaceHashTag.deleteMany({
          where: {
            spaceId,
          },
        });

        const hashTags = await this.findOrCreateHashTags(prisma, hashTagProps);

        updateArgs.data = {
          ...updateArgs.data,
          hashTags: {
            create: hashTags.map((hashTag) => ({
              hashTagId: hashTag.id,
            })),
          },
        };
      }

      if (publicTransportations) {
        await prisma.publicTransportation.deleteMany({
          where: {
            spaceId,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          publicTransportations: {
            create: publicTransportations.map((publicTransportation) => publicTransportation),
          },
        };
      }

      if (sizes) {
        await prisma.spaceSize.deleteMany({
          where: {
            spaceId,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          sizes: {
            create: sizes.map((size) => size),
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

  async findOrCreateServices(prisma: TransactionPrisma, data: CreateServiceDTO[]) {
    return await Promise.all(
      data.map(async (service) => {
        const isExist = await prisma.service.findFirst({
          where: {
            name: service.name,
          },
        });
        if (isExist) {
          return new ServiceDTO(isExist);
        }
        const newService = await prisma.service.create({
          data: service,
        });
        return new ServiceDTO(newService);
      })
    );
  }

  async findOrCreateCategories(prisma: TransactionPrisma, data: CreateSpaceCategoryDTO[]) {
    return await Promise.all(
      data.map(async (category) => {
        const isExist = await prisma.category.findFirst({
          where: {
            name: category.name,
          },
        });
        if (isExist) {
          return new SpaceCategoryDTO(isExist);
        }
        const newCategory = await prisma.category.create({
          data: category,
        });
        return new SpaceCategoryDTO(newCategory);
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
