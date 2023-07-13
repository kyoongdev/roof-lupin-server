import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { CommonCurationSpace } from '@/interface/curation.interface';

import { SpaceDTO } from '../space/dto';

import { CreateCurationDTO, CurationDetailDTO, CurationDTO, UpdateCurationDTO } from './dto';
import { CurationException } from './exception/curation.exception';
import { CURATION_ERROR_CODE, CURATION_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class CurationRepository {
  constructor(private readonly database: PrismaService) {}

  async findCuration(id: string) {
    const curation = await this.database.curation.findUnique({
      where: { id },
      include: {
        user: true,
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
          orderBy: {
            orderNo: 'asc',
          },
        },
      },
    });

    if (!curation) {
      throw new CurationException(CURATION_ERROR_CODE.NOT_FOUND(CURATION_NOT_FOUND));
    }
    return new CurationDetailDTO({
      ...curation,
      spaces: curation.spaces.map(({ space, orderNo }) => {
        return {
          space: SpaceDTO.generateSpaceDTO(space),
          orderNo,
        };
      }),
    });
  }

  async findCurations(args = {} as Prisma.CurationFindManyArgs) {
    const curations = await this.database.curation.findMany({
      where: args.where,
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
              },
            },
          },
          orderBy: {
            orderNo: 'asc',
          },
        },
      },
      orderBy: { orderNo: 'asc', ...args.orderBy },
      ...args,
    });
    return curations.map(
      (curation) =>
        new CurationDTO({
          ...curation,
          spaces: (curation.spaces as CommonCurationSpace[]).map(({ space, orderNo }) => ({
            orderNo,
            space: SpaceDTO.generateSpaceDTO(space),
          })),
        })
    );
  }

  async countCurations(args = {} as Prisma.CurationCountArgs) {
    return await this.database.curation.count(args);
  }

  async createCuration(data: CreateCurationDTO, userId?: string) {
    const { spaces, ...rest } = data;
    const curation = await this.database.curation.create({
      data: {
        ...(userId && {
          user: {
            connect: {
              id: userId,
            },
          },
        }),
        ...(spaces && {
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
        }),
        ...rest,
      },
    });

    return curation.id;
  }

  async updateCuration(id: string, data: UpdateCurationDTO) {
    const { spaces, ...rest } = data;
    await this.database.curation.update({
      where: { id },
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
      },
    });
  }

  async deleteCuration(id: string) {
    await this.database.curation.delete({
      where: { id },
    });
  }
}
