import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { PagingDTO } from 'wemacu-nestjs';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';

import { LocationRepository } from '../location/location.repository';

import { SpaceDetailDTO, SpaceDTO } from './dto';
import { CreateSpaceCategoryDTO, SpaceCategoryDTO } from './dto/category';
import { CreateSpaceDTO } from './dto/create-space.dto';
import { CreateFacilityDTO, FacilityDTO } from './dto/facility';
import { CreateHashtagDTO, HashtagDTO } from './dto/hashtag';
import { CreateRefundPolicyDTO } from './dto/refund';
import { RentalTypeDTO, SpaceRentalTypeDTO } from './dto/rentalType';
import { CreateServiceDTO, ServiceDTO } from './dto/service';
import { UpdateSpaceDTO } from './dto/update-space.dto';
import { RENTAL_TYPE_NOT_FOUND, SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';

@Injectable()
export class SpaceRepository {
  constructor(private readonly database: PrismaService, private readonly locationRepository: LocationRepository) {}

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
      location: locationProps,
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
    const isLocationExist = await this.locationRepository.checkLocationByLatLng(locationProps.lat, locationProps.lng);

    const id = await this.database.$transaction(async (prisma) => {
      const facilities = await this.findOrCreateFacilities(prisma, facilityProps);
      const services = await this.findOrCreateServices(prisma, servicesProps);
      const categories = await this.findOrCreateCategories(prisma, categoryProps);
      const hashtags = await this.findOrCreateHashtags(prisma, hashtagProps);
      const location = isLocationExist
        ? isLocationExist
        : await prisma.location.create({
            data: locationProps,
          });
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
          location: {
            create: {
              location: {
                connect: {
                  id: location.id,
                },
              },
            },
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
      location: locationProps,
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

      if (locationProps) {
        await prisma.spaceLocation.deleteMany({
          where: {
            spaceId,
          },
        });

        const isLocationExist = await prisma.location.findUnique({
          where: {
            lat_lng: {
              lat: locationProps.lat,
              lng: locationProps.lng,
            },
          },
        });

        const location = isLocationExist
          ? isLocationExist
          : await prisma.location.create({
              data: locationProps,
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
      if (facilityProps) {
        await prisma.spaceFacility.deleteMany({
          where: {
            spaceId,
          },
        });

        const facilities = await this.findOrCreateFacilities(prisma, facilityProps);

        updateArgs.data = {
          ...updateArgs.data,
          facilities: {
            create: facilities.map((facility) => ({
              facilityId: facility.id,
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

      if (hashtagProps) {
        await prisma.spaceHashtag.deleteMany({
          where: {
            spaceId,
          },
        });

        const hashtags = await this.findOrCreateHashtags(prisma, hashtagProps);

        updateArgs.data = {
          ...updateArgs.data,
          hashtags: {
            create: hashtags.map((hashtag) => ({
              hashtagId: hashtag.id,
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

  async findRentalType(id: string) {
    const rentalType = await this.database.rentalType.findUnique({
      where: {
        id,
      },
      include: {
        timeCostInfo: true,
      },
    });

    if (!rentalType) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND(RENTAL_TYPE_NOT_FOUND));
    }

    return new RentalTypeDTO(rentalType);
  }

  async findRentalTypes(args = {} as Prisma.RentalTypeFindManyArgs) {
    const rentalTypes = await this.database.rentalType.findMany({
      where: {
        ...args.where,
      },
      include: {
        timeCostInfo: true,
      },
      ...args,
    });

    return rentalTypes.map((rentalType) => new RentalTypeDTO(rentalType));
  }

  async findSpaceRentalTypeDetail(spaceId: string) {
    const rentalTypes = await this.database.rentalType.findMany({
      where: {
        spaceId,
      },
      include: {
        timeCostInfo: true,
      },
    });

    return new SpaceRentalTypeDTO(rentalTypes);
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
