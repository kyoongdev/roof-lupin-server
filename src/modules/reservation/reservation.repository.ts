import { Injectable } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { CreateReservationDTO, ReservationDetailDTO, ReservationDTO, UpdateReservationDTO } from './dto';
import { RESERVATION_ERROR_CODE, RESERVATION_NOT_FOUND } from './exception/errorCode';
import { ReservationException } from './exception/reservation.exception';
import { CommonReservation } from './type';

@Injectable()
export class ReservationRepository {
  constructor(private readonly database: PrismaService) {}

  async findReservation(id: string) {
    const reservation = await this.database.reservation.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        rentalType: {
          include: {
            space: {
              include: {
                _count: {
                  select: {
                    reviews: true,
                  },
                },
                location: true,
                publicTransportations: true,
              },
            },
          },
        },
      },
    });

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    const { rentalType, ...rest } = reservation;
    const { space, ...restRentalType } = rentalType;

    return new ReservationDetailDTO({
      ...rest,
      rentalType: restRentalType,
      space: {
        ...space,
        cost: space.minCost,
        reviewCount: space._count.reviews,
        publicTransportation: space.publicTransportations?.at(-1),
        location: space.location?.['location'],
      },
    });
  }

  async countReservations(args = {} as Prisma.ReservationCountArgs) {
    return this.database.reservation.count(args);
  }

  async findReservations(args = {} as Prisma.ReservationFindManyArgs) {
    const reservations = await this.database.reservation.findMany({
      where: args.where,
      include: {
        user: true,
        rentalType: {
          include: {
            space: {
              include: {
                _count: {
                  select: {
                    reviews: true,
                  },
                },
                location: true,
                publicTransportations: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      ...args,
    });

    return reservations.map((reservation) => {
      const { rentalType, ...rest } = reservation;
      const { space, ...restRentalType } = rentalType as CommonReservation;

      return new ReservationDTO({
        ...rest,
        user: rest.user,
        rentalType: restRentalType,
        space: {
          ...space,
          cost: space.minCost,
          reviewCount: space._count.reviews,
          publicTransportation: space.publicTransportations?.at(-1),
          location: space.location?.['location'],
        },
      });
    });
  }

  //TODO: 결제 시스템까지 도입
  async createReservation(userId: string, data: CreateReservationDTO) {
    const { rentalTypeId, ...rest } = data;
    const reservation = await this.database.reservation.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        rentalType: {
          connect: {
            id: rentalTypeId,
          },
        },
        ...rest,
      },
    });
    return reservation.id;
  }

  async updateReservation(id: string, data: UpdateReservationDTO) {
    const { rentalTypeId, ...rest } = data;
    await this.database.reservation.update({
      where: {
        id,
      },
      data: {
        ...rest,
        rentalType: {
          connect: {
            id: rentalTypeId,
          },
        },
      },
    });
  }

  async deleteReservation(id: string) {
    await this.database.reservation.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
