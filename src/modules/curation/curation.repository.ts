import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTO } from '../space/dto';

import { CreateCurationDTO, CreateCurationSpaceDTO, CurationDetailDTO, CurationDTO, UpdateCurationDTO } from './dto';
import { UpdateCurationSpaceDTO } from './dto/update-curation-space.dto';
import { CurationException } from './exception/curation.exception';
import { CURATION_ERROR_CODE, CURATION_NOT_FOUND, CURATION_SPACE_NOT_FOUND } from './exception/errorCode';

@Injectable()
export class CurationRepository {
  constructor(private readonly database: PrismaService) {}

  async checkCurationSpace(curationId: string, spaceId: string) {
    const curationSpace = await this.database.curationSpace.findUnique({
      where: {
        curationId_spaceId: {
          curationId,
          spaceId,
        },
      },
    });

    return curationSpace ? curationSpace : null;
  }

  async findCuration(id: string) {
    const curation = await this.database.curation.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            socials: true,
            setting: true,
          },
        },
        spaces: {
          include: {
            space: {
              include: SpaceDTO.generateSpaceInclude(),
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
      spaces: curation.spaces.map((space) => ({
        ...SpaceDTO.generateSpaceDTO(space.space),
        curationOrderNo: space.orderNo,
      })),
    });
  }

  async findCurations(args = {} as Prisma.CurationFindManyArgs) {
    const curations = await this.database.curation.findMany({
      ...args,
      where: args.where,
      include: {
        spaces: {
          include: {
            space: {
              include: SpaceDTO.generateSpaceInclude(),
            },
          },
          orderBy: {
            orderNo: 'asc',
          },
        },
      },
      orderBy: { orderNo: 'asc' },
    });
    return curations.map(
      (curation) =>
        new CurationDTO({
          ...curation,
          spaces: curation.spaces.map((space) => {
            return {
              ...SpaceDTO.generateSpaceDTO(space.space),
              curationOrderNo: space.orderNo,
            };
          }),
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
        ...rest,
        ...(userId && {
          user: {
            connect: {
              id: userId,
            },
          },
        }),
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

  async createCurationSpace(curationId: string, data: CreateCurationSpaceDTO) {
    await this.database.$transaction(async (prisma) => {
      await prisma.curationSpace.updateMany({
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

      await prisma.curationSpace.create({
        data: {
          orderNo: data.orderNo,
          curation: {
            connect: {
              id: curationId,
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

  async updateCurationSpace(id: string, data: UpdateCurationSpaceDTO) {
    await this.database.$transaction(async (prisma) => {
      const isExist = await prisma.curationSpace.findUnique({
        where: {
          curationId_spaceId: {
            curationId: id,
            spaceId: data.spaceId,
          },
        },
      });

      if (!isExist) {
        throw new CurationException(CURATION_ERROR_CODE.NOT_FOUND(CURATION_SPACE_NOT_FOUND));
      }

      await prisma.curationSpace.updateMany({
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

      await prisma.curationSpace.update({
        where: {
          curationId_spaceId: {
            curationId: id,
            spaceId: data.spaceId,
          },
        },
        data: {
          orderNo: data.orderNo,
        },
      });
    });
  }

  async updateCurationOrder(id: string, orderNo: number) {
    await this.database.$transaction(async (prisma) => {
      const isExist = await prisma.curation.findUnique({
        where: {
          id,
        },
      });

      if (!isExist) {
        throw new CurationException(CURATION_ERROR_CODE.NOT_FOUND(CURATION_NOT_FOUND));
      }

      await prisma.curation.updateMany({
        where: {
          ...(isExist.orderNo > orderNo
            ? {
                AND: [
                  {
                    orderNo: {
                      lt: isExist.orderNo,
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
                      gt: isExist.orderNo ?? 0,
                    },
                  },
                ],
              }),
        },
        data: {
          orderNo: {
            ...(isExist.orderNo > orderNo
              ? {
                  increment: 1,
                }
              : {
                  decrement: 1,
                }),
          },
        },
      });
      await prisma.curation.update({
        where: {
          id,
        },
        data: {
          orderNo,
        },
      });
    });
  }

  async deleteCuration(id: string) {
    const curation = await this.database.curation.findUnique({
      where: { id },
    });

    if (!curation) {
      throw new CurationException(CURATION_ERROR_CODE.NOT_FOUND(CURATION_NOT_FOUND));
    }

    await this.database.curation.updateMany({
      where: {
        orderNo: {
          gt: curation.orderNo,
        },
      },
      data: {
        orderNo: {
          decrement: 1,
        },
      },
    });
    await this.database.curation.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        orderNo: null,
      },
    });
  }

  async hardDeleteCuration(id: string) {
    const curation = await this.database.curation.findUnique({
      where: { id },
    });

    if (!curation) {
      throw new CurationException(CURATION_ERROR_CODE.NOT_FOUND(CURATION_NOT_FOUND));
    }

    await this.database.curation.updateMany({
      where: {
        orderNo: {
          gt: curation.orderNo,
        },
      },
      data: {
        orderNo: {
          decrement: 1,
        },
      },
    });

    await this.database.curation.delete({
      where: { id },
    });
  }

  async deleteCurationSpace(curationId: string, spaceId: string) {
    const curationSpace = await this.database.curationSpace.findUnique({
      where: {
        curationId_spaceId: {
          curationId,
          spaceId,
        },
      },
    });

    if (!curationSpace) {
      throw new CurationException(CURATION_ERROR_CODE.NOT_FOUND(CURATION_SPACE_NOT_FOUND));
    }

    await this.database.curationSpace.updateMany({
      where: {
        orderNo: {
          gt: curationSpace.orderNo,
        },
      },
      data: {
        orderNo: {
          decrement: 1,
        },
      },
    });
  }
}
