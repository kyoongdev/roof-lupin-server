import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDetailDTO, SpaceDTO } from './dto';
import { CreateSpaceCategoryDTO, SpaceCategoryDTO } from './dto/category';
import { CreateSpaceDTO } from './dto/create-space.dto';
import { CreateFacilityDTO, FacilityDTO } from './dto/facility';
import { CreateHashtagDTO, HashtagDTO } from './dto/hashtag';
import { CreateRefundPolicyDTO } from './dto/refund';
import { CreateServiceDTO, ServiceDTO } from './dto/service';
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
          publicTransportation: space.publicTransportations.at(-1),
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

    const facilities = await this.findOrCreateFacilities(facilityProps);
    const services = await this.findOrCreateServices(servicesProps);
    const categories = await this.findOrCreateCategories(categoryProps);
    const hashtags = await this.findOrCreateHashtags(hashtagProps);

    const space = await this.database.space.create({
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
  }

  async findOrCreateFacilities(data: CreateFacilityDTO[]) {
    return await Promise.all(
      data.map(async (facility) => {
        const isExist = await this.database.facility.findFirst({
          where: {
            name: facility.name,
          },
        });
        if (isExist) {
          return new FacilityDTO(isExist);
        }
        const newFacility = await this.database.facility.create({
          data: facility,
        });
        return new FacilityDTO(newFacility);
      })
    );
  }

  async findOrCreateServices(data: CreateServiceDTO[]) {
    return await Promise.all(
      data.map(async (service) => {
        const isExist = await this.database.service.findFirst({
          where: {
            name: service.name,
          },
        });
        if (isExist) {
          return new ServiceDTO(isExist);
        }
        const newService = await this.database.service.create({
          data: service,
        });
        return new ServiceDTO(newService);
      })
    );
  }

  async findOrCreateCategories(data: CreateSpaceCategoryDTO[]) {
    return await Promise.all(
      data.map(async (category) => {
        const isExist = await this.database.category.findFirst({
          where: {
            name: category.name,
          },
        });
        if (isExist) {
          return new SpaceCategoryDTO(isExist);
        }
        const newCategory = await this.database.category.create({
          data: category,
        });
        return new SpaceCategoryDTO(newCategory);
      })
    );
  }

  async findOrCreateHashtags(data: CreateHashtagDTO[]) {
    return await Promise.all(
      data.map(async (hashtag) => {
        const isExist = await this.database.hashtag.findFirst({
          where: {
            name: hashtag.name,
          },
        });
        if (isExist) {
          return new HashtagDTO(isExist);
        }
        const newHashtag = await this.database.hashtag.create({
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
