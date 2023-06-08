import { Injectable } from '@nestjs/common';

import { PrismaService } from '@/database/prisma.service';

import { ReservationDetailDTO } from './dto';

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
}
