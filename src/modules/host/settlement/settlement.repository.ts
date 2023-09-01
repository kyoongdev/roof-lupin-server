import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import { ReservationDTO } from '@/modules/reservation/dto';
import { SpaceDTO } from '@/modules/space/dto';

import { CreateSettlementDTO, SettlementDetailDTO, SettlementDTO, UpdateSettlementDTO } from '../dto/settlement';

import { SETTLEMENT_ERROR_CODE, SETTLEMENT_NOT_FOUND } from './exception/errorCode';
import { SettlementException } from './exception/settlement.exception';

@Injectable()
export class HostSettlementRepository {
  constructor(private readonly database: PrismaService) {}

  async checkSettlementByHostAndDate(year: number, month: number, day: number, hostId: string) {
    const settlement = await this.database.settlement.findFirst({
      where: {
        year,
        month,
        day,
        reservations: {
          some: {
            rentalTypes: {
              some: {
                rentalType: {
                  space: {
                    hostId,
                  },
                },
              },
            },
          },
        },
      },
    });

    return !!settlement;
  }

  async findSettlement(id: string) {
    const settlement = await this.database.settlement.findUnique({
      where: {
        id,
      },
      include: {
        reservations: {
          include: {
            user: {
              include: {
                socials: true,
              },
            },
            spaceReviews: true,
            rentalTypes: {
              include: {
                rentalType: {
                  include: {
                    timeCostInfos: true,
                    space: {
                      include: {
                        reviews: true,
                        location: true,
                        publicTransportations: true,
                        rentalType: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        host: true,
      },
    });

    if (!settlement) {
      throw new SettlementException(SETTLEMENT_ERROR_CODE.NOT_FOUND(SETTLEMENT_NOT_FOUND));
    }

    const { reservations, ...rest } = settlement;
    return new SettlementDetailDTO({
      ...rest,
      reservations: reservations.map(ReservationDTO.generateReservationDTO),
    });
  }

  async findSettlementByDate(year: number, month: number, day: number, hostId: string) {
    const settlement = await this.database.settlement.findFirst({
      where: {
        year,
        month,
        day,
        hostId,
      },
      include: {
        reservations: {
          include: {
            user: {
              include: {
                socials: true,
              },
            },
            spaceReviews: true,
            rentalTypes: {
              include: {
                rentalType: {
                  include: {
                    timeCostInfos: true,
                    space: {
                      include: {
                        reviews: true,
                        location: true,
                        publicTransportations: true,
                        rentalType: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        host: true,
      },
    });

    if (!settlement) {
      throw new SettlementException(SETTLEMENT_ERROR_CODE.NOT_FOUND(SETTLEMENT_NOT_FOUND));
    }
    const { reservations, ...rest } = settlement;

    return new SettlementDetailDTO({
      ...rest,
      reservations: reservations.map(ReservationDTO.generateReservationDTO),
    });
  }

  async checkSettlementByDate(year: number, month: number, day: number, hostId: string) {
    const settlement = await this.database.settlement.findFirst({
      where: {
        year,
        month,
        day,
        hostId,
      },
      include: {
        reservations: {
          include: ReservationDTO.generateReservationInclude(),
        },
        host: true,
      },
    });
    if (!settlement) {
      return false;
    }

    const { reservations, ...rest } = settlement;

    return new SettlementDetailDTO({
      ...rest,
      reservations: reservations.map(ReservationDTO.generateReservationDTO),
    });
  }

  async countSettlements(args = {} as Prisma.SettlementCountArgs) {
    return await this.database.settlement.count(args);
  }

  async findSettlements(args = {} as Prisma.SettlementFindManyArgs) {
    const settlements = await this.database.settlement.findMany({
      where: args.where,
      orderBy: [
        {
          year: 'asc',
        },
        {
          month: 'asc',
        },
        {
          day: 'asc',
        },
      ],
      ...args,
    });

    return settlements.map((settlement) => new SettlementDTO(settlement));
  }

  async createSettlement(data: CreateSettlementDTO) {
    const { reservationIds, hostId, ...rest } = data;

    const settlement = await this.database.settlement.create({
      data: {
        ...rest,
        reservations: {
          connect: [...reservationIds.map((id) => ({ id }))],
        },
        host: {
          connect: {
            id: hostId,
          },
        },
      },
    });
    return settlement.id;
  }

  async createSettlementWithTransaction(database: TransactionPrisma, data: CreateSettlementDTO) {
    const { reservationIds, hostId, ...rest } = data;

    const settlement = await database.settlement.create({
      data: {
        ...rest,
        reservations: {
          connect: [...reservationIds.map((id) => ({ id }))],
        },
        host: {
          connect: {
            id: hostId,
          },
        },
      },
    });
    return settlement.id;
  }

  async updateSettlement(id: string, data: UpdateSettlementDTO) {
    const { reservationIds, ...rest } = data;
    const updateArgs: Prisma.SettlementUpdateArgs = {
      where: {
        id,
      },
      data: {
        ...rest,
      },
    };

    if (data.reservationIds) {
      updateArgs.data = {
        ...updateArgs.data,
        reservations: {
          connect: [...reservationIds.map((id) => ({ id }))],
        },
      };
    }

    await this.database.settlement.update(updateArgs);
  }

  async deleteSettlementReservation(id: string, reservationId: string) {
    await this.database.settlement.update({
      where: {
        id,
      },
      data: {
        reservations: {
          disconnect: {
            id: reservationId,
          },
        },
      },
    });
  }

  async updateSettlementWithTransaction(database: TransactionPrisma, id: string, data: UpdateSettlementDTO) {
    const { reservationIds, ...rest } = data;
    const updateArgs: Prisma.SettlementUpdateArgs = {
      where: {
        id,
      },
      data: {
        ...rest,
      },
    };

    if (data.reservationIds) {
      updateArgs.data = {
        ...updateArgs.data,
        reservations: {
          connect: reservationIds.map((id) => ({ id })),
        },
      };
    }

    await database.settlement.update(updateArgs);
  }

  async deleteSettlement(id: string) {
    await this.database.settlement.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async hardDeleteSettlement(id: string) {
    await this.database.settlement.delete({
      where: {
        id,
      },
    });
  }
}
