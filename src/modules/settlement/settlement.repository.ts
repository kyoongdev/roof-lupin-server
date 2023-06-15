import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { ReservationDTO, ReservationDTOProps } from '../reservation/dto';

import { SettlementDetailDTO } from './dto';
import { SETTLEMENT_ERROR_CODE, SETTLEMENT_HOST_NOT_FOUND, SETTLEMENT_NOT_FOUND } from './exception/errorCode';
import { SettlementException } from './exception/settlement.exception';

@Injectable()
export class SettlementRepository {
  constructor(private readonly database: PrismaService) {}

  async findSettlement(id: string) {
    const settlement = await this.database.settlement.findUnique({
      where: {
        id,
      },
      include: {
        reservations: {
          include: {
            user: true,
            rentalType: {
              include: {
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
    });

    if (!settlement) {
      throw new SettlementException(SETTLEMENT_ERROR_CODE.NOT_FOUND(SETTLEMENT_NOT_FOUND));
    }

    let hostId: string | null = null;
    const { reservations, ...rest } = settlement;

    const reservationDTOs = reservations.map<ReservationDTOProps>((reservation) => {
      const { rentalType, ...rest } = reservation;
      const { space, ...restRentalType } = rentalType;
      if (!hostId) hostId = space.hostId;
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
      };
    });

    if (!hostId) {
      throw new SettlementException(SETTLEMENT_ERROR_CODE.NOT_FOUND(SETTLEMENT_HOST_NOT_FOUND));
    }

    const host = await this.database.host.findUnique({
      where: {
        id: hostId,
      },
    });

    if (!host) {
      throw new SettlementException(SETTLEMENT_ERROR_CODE.NOT_FOUND(SETTLEMENT_HOST_NOT_FOUND));
    }

    return new SettlementDetailDTO({
      ...rest,
      reservations: reservationDTOs,
      host,
    });
  }
}
