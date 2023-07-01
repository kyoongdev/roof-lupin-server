import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';

import { BestPhotoDTO } from '../review/dto';
import { ReviewRepository } from '../review/review.repository';

import { CreateSpaceDTO, SpaceDetailDTO, SpaceDTO, SpaceIdsDTO, UpdateSpaceDTO } from './dto';
import { AdditionalServiceDTO } from './dto/additionalService';
import { CreateSpaceCategoryDTO, SpaceCategoryDTO } from './dto/category';
import { BuildingDTO, CreateBuildingDTO } from './dto/facility';
import { CreateHashtagDTO, HashtagDTO } from './dto/hashtag';
import { CreateServiceDTO, ServiceDTO } from './dto/service';
import { SPACE_ERROR_CODE } from './exception/errorCode';
import { SpaceException } from './exception/space.exception';
import { RentalTypeRepository } from './rentalType/rentalType.repository';

@Injectable()
export class SpaceRepository {
  constructor(private readonly database: PrismaService, private readonly rentalTypeRepository: RentalTypeRepository) {}

  async findSpaceIds() {
    const spaces = await this.database.space.findMany({
      select: {
        id: true,
      },
    });
    return new SpaceIdsDTO({ ids: spaces.map((space) => space.id) });
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
        location: true,
        publicTransportations: true,
        refundPolicies: true,
        services: {
          include: {
            service: true,
          },
        },
        userInterests: true,
        sizes: true,
        additionalServices: true,
      },
    });

    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND());
    }

    const {
      cautions,
      categories,
      buildings,
      hashtags,
      host,
      images,
      publicTransportations,
      refundPolicies,
      services,
      userInterests,
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
      hashtags: hashtags.map(({ hashtag }) => hashtag),
      host,
      images: images.map(({ image }) => image),
      publicTransportations: publicTransportations.map((publicTransportation) => publicTransportation),
      refundPolicies: refundPolicies.map((refundPolicy) => refundPolicy),
      services: services.map(({ service }) => service),
      isInterested: userInterests.some((userInterest) => userInterest.userId === userId),
      qnaCount: space._count.spaceQnAs,
      averageScore: Number(space.averageScore),
      bestPhotos: bestPhotos.map((photo) => ({
        id: photo.image.id,
        url: photo.image.url,
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
      },
    });
    if (!space) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND());
    }
    space.rentalType;
    return new SpaceDTO({
      ...space,

      reviewCount: space.reviews.length,
      publicTransportation: space.publicTransportations?.at(-1),
      location: space.location,
      averageScore: Number(space.averageScore),
      isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
    });
  }

  async countSpaces(args = {} as Prisma.SpaceCountArgs) {
    return this.database.space.count(args);
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
          publicTransportation: space.publicTransportations?.at(-1),
          location: space.location,
          averageScore: Number(space.averageScore),
          isInterested: space.userInterests.some((userInterest) => userInterest.userId === userId),
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
      buildings: buildingProps,
      services: servicesProps,
      categories: categoryProps,
      hashtags: hashtagProps,
      publicTransportations,
      sizes,
      additionalServices,
      ...rest
    } = data;

    const minCost = Math.min(...rentalTypes.map((rentalType) => rentalType.baseCost));
    const minSize = Math.min(...sizes.map((size) => size.size));

    const id = await this.database.$transaction(async (prisma) => {
      const buildings = await this.findOrCreateBuildings(prisma, buildingProps);
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
              ...locationProps,
            },
          },
          additionalServices: {
            create: additionalServices.map((additionalService) => additionalService),
          },
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
      hashtags: hashtagProps,
      publicTransportations,
      sizes,
      additionalServices,
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

      if (additionalServices) {
        await prisma.additionalService.deleteMany({
          where: {
            spaceId,
          },
        });

        updateArgs.data = {
          ...updateArgs.data,
          additionalServices: {
            create: additionalServices.map((additionalService) => additionalService),
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

  async findSpaceAdditionalServices(spaceId: string) {
    const additionalServices = await this.database.additionalService.findMany({
      where: {
        spaceId,
      },
    });
    return additionalServices.map((additionalService) => new AdditionalServiceDTO(additionalService));
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
