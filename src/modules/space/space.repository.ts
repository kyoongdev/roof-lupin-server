import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';

import { SpaceDetailDTO, SpaceDTO } from './dto';
import { CreateSpaceCategoryDTO, SpaceCategoryDTO } from './dto/category';
import { CreateSpaceDTO } from './dto/create-space.dto';
import { CreateFacilityDTO, FacilityDTO } from './dto/facility';
import { CreateHashtagDTO, HashtagDTO } from './dto/hashtag';
import { CreateRefundPolicyDTO } from './dto/refund';
import { CreateServiceDTO, ServiceDTO } from './dto/service';
import { UpdateSpaceDTO } from './dto/update-space.dto';
import { SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';

@Injectable()
export class SpaceRepository {
  constructor(private readonly database: PrismaService) {}

  async findSpace(id: string, userId?: string) {
    const space = await this.database.space.findUnique({
      where: {
        id,
      },
      include: {
        _count: {
          select: {
            reviews: true,
          },
        },
        categories: {
          include: {
            category: true,
          },
        },
        cautions: true,
        facilities: {
          include: {
            facility: true,
          },
        },
        hashtags: {
          include: {
            hashtag: true,
          },
        },
        host: true,
        images: {
          include: {
            image: true,
          },
        },
        location: {
          include: {
            location: true,
          },
        },
        publicTransportations: true,
        refundPolicies: true,
        services: {
          include: {
            service: true,
          },
        },
        userInterests: true,
      },
    });

    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND());
    }
    const {
      cautions,
      categories,
      facilities,
      hashtags,
      host,
      images,
      location,
      publicTransportations,
      refundPolicies,
      services,
      userInterests,
    } = space;

    return new SpaceDetailDTO({
      ...space,
      reviewCount: space._count.reviews,
      cautions: cautions.map((caution) => caution),
      categories: categories.map(({ category }) => category),
      facilities: facilities.map(({ facility }) => facility),
      location: location?.location,
      hashtags: hashtags.map(({ hashtag }) => hashtag),
      host,
      images: images.map(({ image }) => image),
      publicTransportations: publicTransportations.map((publicTransportation) => publicTransportation),
      refundPolicies: refundPolicies.map((refundPolicy) => refundPolicy),
      services: services.map(({ service }) => service),
      isInterested: userInterests.some((userInterest) => userInterest.userId === userId),
      cost: space.minCost,
    });
  }

  async countSpaces(args = {} as Prisma.SpaceCountArgs) {
    return this.database.space.count(args);
  }

  async findSpaces(args = {} as Prisma.SpaceFindManyArgs) {
    const spaces = await this.database.space.findMany({
      where: args.where,
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      include: {
        location: {
          include: {
            location: true,
          },
        },
        _count: {
          select: {
            reviews: true,
          },
        },
      },
      ...args,
    });

    //TODO: isBest는 어떻게 산정?
    return spaces.map(
      (space) =>
        new SpaceDTO({
          ...space,
          cost: space.minCost,
          reviewCount: space._count.reviews,
          publicTransportation: space.publicTransportations?.at(-1),
          location: space.location?.['location'],
        })
    );
  }

  async createSpace(hostId: string, data: CreateSpaceDTO) {
    const {
      images,
      refundPolicies,
      cautions,
      rentalTypes,
      location,
      facilities: facilityProps,
      services: servicesProps,
      categories: categoryProps,
      hashtags: hashtagProps,
      publicTransportations,
      sizes,
      ...rest
    } = data;

    const minCost = Math.min(...rentalTypes.map((rentalType) => rentalType.baseCost));
    const minSize = Math.min(...sizes.map((size) => size.size));

    const id = await this.database.$transaction(async (prisma) => {
      const facilities = await this.findOrCreateFacilities(prisma, facilityProps);
      const services = await this.findOrCreateServices(prisma, servicesProps);
      const categories = await this.findOrCreateCategories(prisma, categoryProps);
      const hashtags = await this.findOrCreateHashtags(prisma, hashtagProps);

      const space = await prisma.space.create({
        data: {
          ...rest,
          minCost,
          minSize,
          host: {
            connect: {
              id: hostId,
            },
          },
          images: {
            create: images.map((image) => ({
              imageId: image,
            })),
          },
          refundPolicies: {
            create: refundPolicies.map((refundPolicy) => refundPolicy),
          },
          cautions: {
            create: cautions.map((caution) => caution),
          },
          rentalType: {
            create: rentalTypes.map((rentalType) => rentalType),
          },
          facilities: {
            create: facilities.map((facility) => ({
              facilityId: facility.id,
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
          hashtags: {
            create: hashtags.map((hashtag) => ({
              hashtagId: hashtag.id,
            })),
          },
          publicTransportations: {
            create: publicTransportations.map((publicTransportation) => publicTransportation),
          },
          sizes: {
            create: sizes.map((size) => size),
          },
        },
      });
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
      location,
      facilities: facilityProps,
      services: servicesProps,
      categories: categoryProps,
      hashtags: hashtagProps,
      publicTransportations,
      sizes,
      ...rest
    } = data;

    const updateArgs: Prisma.SpaceUpdateArgs = {
      where: {
        id: spaceId,
      },
      data: {
        ...rest,
      },
    };
    await this.database.$transaction(async (prisma) => {
      if (images) {
        await prisma.spaceImage.deleteMany({
          where: {
            spaceId,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          images: {
            create: images.map((image) => ({
              imageId: image,
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

        updateArgs.data = {
          ...updateArgs.data,
          rentalType: {
            create: rentalTypes.map((rentalType) => rentalType),
          },
        };
      }

      if (location) {
        await prisma.spaceLocation.deleteMany({
          where: {
            spaceId,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          location: {
            create: {
              locationId: location.id,
            },
          },
        };
      }
    });
  }

  async findOrCreateFacilities(prisma: TransactionPrisma, data: CreateFacilityDTO[]) {
    return await Promise.all(
      data.map(async (facility) => {
        const isExist = await prisma.facility.findFirst({
          where: {
            name: facility.name,
          },
        });
        if (isExist) {
          return new FacilityDTO(isExist);
        }
        const newFacility = await prisma.facility.create({
          data: facility,
        });
        return new FacilityDTO(newFacility);
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

  async findOrCreateHashtags(prisma: TransactionPrisma, data: CreateHashtagDTO[]) {
    return await Promise.all(
      data.map(async (hashtag) => {
        const isExist = await prisma.hashtag.findFirst({
          where: {
            name: hashtag.name,
          },
        });
        if (isExist) {
          return new HashtagDTO(isExist);
        }
        const newHashtag = await prisma.hashtag.create({
          data: hashtag,
        });
        return new HashtagDTO(newHashtag);
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
