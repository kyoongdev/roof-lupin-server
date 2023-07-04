import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';
import { ReservationDTOProps } from '@/modules/reservation/dto';

import { CreateSettlementDTO, SettlementDetailDTO, SettlementDTO, UpdateSettlementDTO } from '../dto/settlement';

import { SETTLEMENT_ERROR_CODE, SETTLEMENT_HOST_NOT_FOUND, SETTLEMENT_NOT_FOUND } from './exception/errorCode';
import { SettlementException } from './exception/settlement.exception';

@Injectable()
export class SettlementRepository {
  constructor(private readonly database: PrismaService) {}

  async checkSettlementByHostAndDate(year: string, month: string, day: string, hostId: string) {
    const settlement = await this.database.settlement.findFirst({
      where: {
        year,
        month,
        day,
        reservations: {
          some: {
            rentalType: {
              space: {
                hostId,
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
            user: true,
            spaceReviews: true,
            rentalType: {
              include: {
                timeCostInfo: true,
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
        host: true,
      },
    });

    if (!settlement) {
      throw new SettlementException(SETTLEMENT_ERROR_CODE.NOT_FOUND(SETTLEMENT_NOT_FOUND));
    }

    const { reservations, ...rest } = settlement;

    const reservationDTOs = reservations.map<ReservationDTOProps>((reservation) => {
      const { rentalType, ...rest } = reservation;
      const { space, ...restRentalType } = rentalType;

      const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;
      return {
        ...rest,
        user: rest.user,
        rentalType: restRentalType,
        space: {
          ...space,
          reviewCount: space.reviews.length,
          publicTransportation: space.publicTransportations?.at(-1),
          location: space.location?.['location'],
          averageScore: averageScore,
        },
        isReviewed: reservation.spaceReviews ? reservation.spaceReviews.length > 0 : false,
      };
    });

    return new SettlementDetailDTO({
      ...rest,
      reservations: reservationDTOs,
    });
  }

  async findSettlementByDate(year: string, month: string, day: string, hostId: string) {
    const settlement = await this.database.settlement.findFirst({
      where: {
        year,
        month,
        day,
      },
    });

    if (!settlement) {
      throw new SettlementException(SETTLEMENT_ERROR_CODE.NOT_FOUND(SETTLEMENT_NOT_FOUND));
    }

    return new SettlementDTO(settlement);
  }

  async checkSettlementByDate(year: string, month: string, day: string, hostId: string) {
    const settlement = await this.database.settlement.findFirst({
      where: {
        year,
        month,
        day,
      },
    });

    return new SettlementDTO(settlement);
  }

  async countSettlements(args = {} as Prisma.SettlementCountArgs) {
    return await this.database.settlement.count(args);
  }

  async findSettlements(args = {} as Prisma.SettlementFindManyArgs) {
    const settlements = await this.database.settlement.findMany({
      where: args.where,
      orderBy: {
        year: 'asc',
        month: 'asc',
        day: 'asc',
        ...args.orderBy,
      },
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
          deleteMany: {},
          connect: [...reservationIds.map((id) => ({ id }))],
        },
      };
    }

    await this.database.settlement.update(updateArgs);
  }

  async deleteSettlement(id: string) {
    await this.database.settlement.delete({
      where: {
        id,
      },
    });
  }
}
