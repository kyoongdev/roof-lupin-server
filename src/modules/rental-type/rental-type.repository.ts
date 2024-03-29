import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import type { CommonReservationWithRentalType } from '@/interface/reservation.interface';
import { ReservationDTO } from '@/modules/reservation/dto';

import { AdditionalServiceDTO } from '../space/dto/additional-service';
import { SPACE_ERROR_CODE } from '../space/exception/errorCode';
import { SpaceException } from '../space/exception/space.exception';

import {
  CreateRentalTypeDTO,
  RentalTypeDTO,
  RentalTypeWithReservationDTO,
  SpaceRentalTypeDTO,
  UpdateRentalTypeDTO,
} from './dto';

@Injectable()
export class RentalTypeRepository {
  constructor(private readonly database: PrismaService) {}

  async findRentalTypeAdditionalServices(id: string) {
    const rentalType = await this.database.rentalType.findUnique({
      where: {
        id,
      },
      include: {
        additionalServices: true,
      },
    });

    if (!rentalType) {
      throw new SpaceException(SPACE_ERROR_CODE.RENTAL_TYPE_NOT_FOUND);
    }

    return rentalType.additionalServices.map((service) => new AdditionalServiceDTO(service));
  }

  async findRentalType(id: string) {
    const rentalType = await this.database.rentalType.findUnique({
      where: {
        id,
      },
      include: {
        timeCostInfos: {
          orderBy: {
            time: 'asc',
          },
        },
        additionalServices: true,
      },
    });

    if (!rentalType) {
      throw new SpaceException(SPACE_ERROR_CODE.RENTAL_TYPE_NOT_FOUND);
    }

    return new RentalTypeDTO(rentalType);
  }

  async findRentalTypes(args = {} as Prisma.RentalTypeFindManyArgs) {
    const rentalTypes = await this.database.rentalType.findMany({
      ...args,
      where: {
        ...args.where,
      },
      include: {
        timeCostInfos: {
          orderBy: {
            time: 'asc',
          },
        },
        additionalServices: true,
      },
    });

    return rentalTypes.map((rentalType) => new RentalTypeDTO(rentalType));
  }

  async findRentalTypesWithReservations(
    args = {} as Prisma.RentalTypeFindManyArgs,
    reservationArgs = {} as Prisma.ReservationFindManyArgs
  ) {
    const rentalTypes = await this.database.rentalType.findMany({
      ...args,
      where: {
        ...args.where,
      },
      include: {
        timeCostInfos: {
          orderBy: {
            time: 'asc',
          },
        },
        additionalServices: true,
        reservations: {
          where: {
            reservation: {
              ...reservationArgs.where,
            },
          },
          include: {
            reservation: {
              include: ReservationDTO.generateReservationInclude(),
            },
          },
        },
      },
    });

    return rentalTypes.map(
      (rentalType) =>
        new RentalTypeWithReservationDTO({
          id: rentalType.id,
          baseCost: rentalType.baseCost,
          name: rentalType.name,
          rentalType: rentalType.rentalType,
          timeCostInfos: rentalType.timeCostInfos,
          reservations: (rentalType.reservations as CommonReservationWithRentalType[]).map(({ reservation }) => {
            return ReservationDTO.generateReservationDTO(reservation);
          }),
          baseHour: rentalType.baseHour,
          endAt: rentalType.endAt,
          startAt: rentalType.startAt,
          spaceId: rentalType.spaceId,
          day: rentalType.day,
          additionalServices: rentalType.additionalServices,
        })
    );
  }

  async findRentalTypeWithReservations(
    id: string,
    rentalTypeArgs = {} as Prisma.RentalTypeFindFirstArgs,
    reservationArgs = {} as Prisma.ReservationFindManyArgs
  ) {
    const rentalType = await this.database.rentalType.findFirst({
      where: {
        id,
        ...rentalTypeArgs.where,
      },
      include: {
        additionalServices: true,
        timeCostInfos: {
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
              include: ReservationDTO.generateReservationInclude(),
            },
          },
        },
      },
    });

    if (!rentalType) {
      throw new SpaceException(SPACE_ERROR_CODE.RENTAL_TYPE_NOT_FOUND);
    }

    return new RentalTypeWithReservationDTO({
      id: rentalType.id,
      baseCost: rentalType.baseCost,
      name: rentalType.name,
      rentalType: rentalType.rentalType,
      timeCostInfos: rentalType.timeCostInfos,
      reservations: (rentalType.reservations as CommonReservationWithRentalType[]).map(({ reservation }) =>
        ReservationDTO.generateReservationDTO(reservation)
      ),
      baseHour: rentalType.baseHour,
      day: rentalType.day,
      endAt: rentalType.endAt,
      startAt: rentalType.startAt,
      spaceId: rentalType.spaceId,
      additionalServices: rentalType.additionalServices,
    });
  }

  async findSpaceRentalTypeDetail(spaceId: string) {
    const rentalTypes = await this.database.rentalType.findMany({
      where: {
        spaceId,
      },
      include: {
        timeCostInfos: {
          orderBy: {
            time: 'asc',
          },
        },
        additionalServices: true,
      },
    });

    return new SpaceRentalTypeDTO(rentalTypes);
  }

  async createRentalTypes(prisma: TransactionPrisma, spaceId: string, data: CreateRentalTypeDTO[]) {
    await Promise.all(
      data
        .map((rentalType) => new CreateRentalTypeDTO(rentalType))
        .map(async (rentalType) => {
          const { timeCostInfos, additionalServices, ...rest } = rentalType;
          const createArgs: Prisma.RentalTypeCreateArgs = {
            data: {
              ...rest,
              space: {
                connect: {
                  id: spaceId,
                },
              },
              additionalServices: {
                create: additionalServices.map((service) => service),
              },
            },
          };

          if (rest.rentalType === 1) {
            rentalType.validateTimeCostInfos();
            createArgs.data = {
              ...createArgs.data,
              baseCost: Math.min(...timeCostInfos.map(({ cost }) => cost)),
              timeCostInfos: {
                create: timeCostInfos.map((timeCostInfo) => ({
                  cost: timeCostInfo.cost,
                  time: timeCostInfo.time,
                })),
              },
            };
          }
          await prisma.rentalType.create(createArgs);
        })
    );
  }

  async updateRentalType(rentalTypeId: string, data: UpdateRentalTypeDTO) {
    const { timeCostInfos, additionalServices, ...rest } = data;

    const updateArgs: Prisma.RentalTypeUpdateArgs = {
      where: {
        id: rentalTypeId,
      },
      data: {
        ...rest,
      },
    };

    if (additionalServices) {
      updateArgs.data = {
        ...updateArgs.data,
        additionalServices: {
          deleteMany: {
            rentalTypeId,
          },
          create: additionalServices.map((service) => service),
        },
      };
    }

    if (timeCostInfos) {
      data.validateTimeCostInfos();
      updateArgs.data = {
        ...updateArgs.data,
        timeCostInfos: {
          deleteMany: {
            rentalTypeId,
          },
          create: timeCostInfos.map((timeCostInfo) => ({
            cost: timeCostInfo.cost,
            time: timeCostInfo.time,
          })),
        },
      };
    }

    await this.database.rentalType.update(updateArgs);
  }
}
