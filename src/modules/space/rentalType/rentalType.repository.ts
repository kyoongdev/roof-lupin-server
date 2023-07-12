import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { reservationInclude } from '@/common/constants/query';
import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import type { CommonReservationRentalType, CommonReservationWithRentalType } from '@/interface/reservation.interface';
import { ReservationDTO } from '@/modules/reservation/dto';

import {
  CreateRentalTypeDTO,
  RentalTypeDTO,
  RentalTypeWithReservationDTO,
  SpaceRentalTypeDTO,
  UpdateRentalTypeDTO,
} from '../dto/rentalType';
import { RENTAL_TYPE_NOT_FOUND, SPACE_ERROR_CODE } from '../exception/errorCode';
import { SpaceException } from '../exception/space.exception';

@Injectable()
export class RentalTypeRepository {
  constructor(private readonly database: PrismaService) {}

  async findRentalType(id: string) {
    const rentalType = await this.database.rentalType.findUnique({
      where: {
        id,
      },
      include: {
        timeCostInfo: {
          orderBy: {
            time: 'asc',
          },
        },
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
        timeCostInfo: {
          orderBy: {
            time: 'asc',
          },
        },
      },
      ...args,
    });

    return rentalTypes.map((rentalType) => new RentalTypeDTO(rentalType));
  }

  async findRentalTypesWithReservations(
    args = {} as Prisma.RentalTypeFindManyArgs,
    reservationArgs = {} as Prisma.ReservationFindManyArgs
  ) {
    const rentalTypes = await this.database.rentalType.findMany({
      where: {
        ...args.where,
      },
      include: {
        timeCostInfo: {
          orderBy: {
            time: 'asc',
          },
        },
        reservations: {
          where: {
            reservation: {
              ...reservationArgs.where,
            },
          },
          include: {
            reservation: {
              include: reservationInclude,
            },
          },
        },
      },
      ...args,
    });

    return rentalTypes.map(
      (rentalType) =>
        new RentalTypeWithReservationDTO({
          id: rentalType.id,
          baseCost: rentalType.baseCost,
          name: rentalType.name,
          rentalType: rentalType.rentalType,
          timeCostInfo: rentalType.timeCostInfo,
          reservations: (rentalType.reservations as CommonReservationWithRentalType[]).map(({ reservation }) =>
            ReservationDTO.generateReservationDTO(reservation)
          ),
          baseHour: rentalType.baseHour,
          endAt: rentalType.endAt,
          startAt: rentalType.startAt,
          spaceId: rentalType.spaceId,
          day: rentalType.day,
        })
    );
  }

  async findRentalTypeWithReservations(id: string, reservationArgs = {} as Prisma.ReservationFindManyArgs) {
    const rentalType = await this.database.rentalType.findUnique({
      where: {
        id,
      },
      include: {
        timeCostInfo: {
          orderBy: {
            time: 'asc',
          },
        },
        reservations: {
          where: {
            reservation: {
              ...reservationArgs.where,
            },
          },
          include: {
            reservation: {
              include: {
                user: true,
                rentalTypes: {
                  include: {
                    rentalType: {
                      include: {
                        timeCostInfo: true,
                        space: {
                          include: {
                            reviews: true,
                            location: true,
                            publicTransportations: true,
                            userInterests: true,
                            rentalType: true,
                          },
                        },
                      },
                    },
                  },
                },
                spaceReviews: true,
              },
            },
          },
        },
      },
    });

    if (!rentalType) {
      throw new SpaceException(SPACE_ERROR_CODE.NOT_FOUND(RENTAL_TYPE_NOT_FOUND));
    }

    return new RentalTypeWithReservationDTO({
      id: rentalType.id,
      baseCost: rentalType.baseCost,
      name: rentalType.name,
      rentalType: rentalType.rentalType,
      timeCostInfo: rentalType.timeCostInfo,
      reservations: (rentalType.reservations as CommonReservationWithRentalType[]).map(({ reservation }) => {
        const { rentalTypes, ...rest } = reservation;
        const { space } = (rentalTypes[0] as CommonReservationRentalType).rentalType;
        const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;
        return {
          ...rest,
          rentalTypes: (rentalTypes as CommonReservationRentalType[]).map((rentalType) => rentalType),
          space: {
            ...space,
            reviewCount: space.reviews.length,
            location: space.location?.['location'],
            averageScore,
          },
          isReviewed: rest.spaceReviews.length > 0,
        };
      }),
      baseHour: rentalType.baseHour,
      day: rentalType.day,
      endAt: rentalType.endAt,
      startAt: rentalType.startAt,
      spaceId: rentalType.spaceId,
    });
  }

  async findSpaceRentalTypeDetail(spaceId: string) {
    const rentalTypes = await this.database.rentalType.findMany({
      where: {
        spaceId,
      },
      include: {
        timeCostInfo: {
          orderBy: {
            time: 'asc',
          },
        },
      },
    });

    return new SpaceRentalTypeDTO(rentalTypes);
  }

  async createRentalTypes(prisma: TransactionPrisma, spaceId: string, data: CreateRentalTypeDTO[]) {
    await Promise.all(
      data.map(async (rentalType) => {
        const { timeCostInfos, ...rest } = rentalType;
        const createArgs: Prisma.RentalTypeCreateArgs = {
          data: {
            ...rest,
            space: {
              connect: {
                id: spaceId,
              },
            },
          },
        };
        if (rest.rentalType === 1) {
          createArgs.data = {
            ...createArgs.data,
            timeCostInfo: {
              create: timeCostInfos.map((timeCostInfo) => timeCostInfo),
            },
          };
        }
        await prisma.rentalType.create(createArgs);
      })
    );
  }

  async updateRentalType(rentalTypeId: string, data: UpdateRentalTypeDTO) {
    const { timeCostInfos, ...rest } = data;

    const updateArgs: Prisma.RentalTypeUpdateArgs = {
      where: {
        id: rentalTypeId,
      },
      data: {
        ...rest,
      },
    };
    if (timeCostInfos) {
      updateArgs.data = {
        ...updateArgs.data,
        timeCostInfo: {
          deleteMany: {
            rentalTypeId,
          },
          create: timeCostInfos.map((timeCostInfo) => timeCostInfo),
        },
      };
    }

    await this.database.rentalType.update(updateArgs);
  }
}
