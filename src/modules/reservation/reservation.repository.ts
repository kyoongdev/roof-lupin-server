import { Injectable } from '@nestjs/common';

import { Prisma, Space } from '@prisma/client';

import { PrismaService } from '@/database/prisma.service';

import { SpaceDTOProps } from '../space/dto';

import { ReservationDetailDTO, ReservationDTO } from './dto';
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
}
