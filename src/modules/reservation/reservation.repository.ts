import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';

import { CreatePaymentDTO, ReservationDetailDTO, ReservationDTO, UpdatePaymentDTO, UpdateReservationDTO } from './dto';
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
        spaceReviews: true,
      },
    });

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    const { rentalType, ...rest } = reservation;
    const { space, ...restRentalType } = rentalType;
    const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;

    return new ReservationDetailDTO({
      ...rest,
      rentalType: restRentalType,
      isReviewed: rest.spaceReviews.length > 0,
      space: {
        ...space,
        reviewCount: space.reviews.length,
        publicTransportation: space.publicTransportations?.at(-1),
        location: space.location?.['location'],
        averageScore,
      },
    });
  }

  async findReservationByOrderId(orderId: string) {
    const reservation = await this.database.reservation.findUnique({
      where: {
        orderId,
      },
      include: {
        user: true,
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
        spaceReviews: true,
      },
    });

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    const { rentalType, ...rest } = reservation;
    const { space, ...restRentalType } = rentalType;
    const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;

    return new ReservationDetailDTO({
      ...rest,
      rentalType: restRentalType,
      isReviewed: rest.spaceReviews.length > 0,
      space: {
        ...space,
        reviewCount: space.reviews.length,
        publicTransportation: space.publicTransportations?.at(-1),
        location: space.location?.['location'],
        averageScore,
      },
    });
  }

  async findReservationByOrderResultId(orderResultId: string) {
    const reservation = await this.database.reservation.findUnique({
      where: {
        orderResultId,
      },
      include: {
        user: true,
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
        spaceReviews: true,
      },
    });

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    const { rentalType, ...rest } = reservation;
    const { space, ...restRentalType } = rentalType;
    const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;

    return new ReservationDetailDTO({
      ...rest,
      rentalType: restRentalType,
      space: {
        ...space,
        reviewCount: space.reviews.length,
        publicTransportation: space.publicTransportations?.at(-1),
        location: space.location?.['location'],
        averageScore,
      },
      isReviewed: rest.spaceReviews.length > 0,
    });
  }

  async countReservations(args = {} as Prisma.ReservationCountArgs) {
    return this.database.reservation.count(args);
  }

  async findReservations(args = {} as Prisma.ReservationFindManyArgs) {
    const reservations = await this.database.reservation.findMany({
      where: {
        ...args.where,
      },
      include: {
        user: true,
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
        spaceReviews: true,
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

      const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;

      return new ReservationDTO({
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
      });
    });
  }

  //TODO: 결제 시스템까지 도입
  async createReservation(userId: string, data: CreatePaymentDTO) {
    const { rentalTypeId, spaceId, userCouponIds, ...rest } = data;
    const taxCost = Math.floor(rest.totalCost / 1.1);

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
        userCoupon: {
          connect: userCouponIds.map((id) => ({ id })),
        },
        taxFreeCost: rest.totalCost - taxCost,
        ...rest,
      },
    });
    return reservation;
  }
  async createReservationWithTransaction(database: TransactionPrisma, userId: string, data: CreatePaymentDTO) {
    const { rentalTypeId, spaceId, ...rest } = data;
    const taxCost = Math.floor(rest.totalCost / 1.1);

    const reservation = await database.reservation.create({
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
        taxFreeCost: rest.totalCost - taxCost,
      },
    });
    return reservation;
  }

  async updateReservation(id: string, data: UpdateReservationDTO) {
    await this.database.reservation.update({
      where: {
        id,
      },
      data,
    });
  }

  async updatePayment(id: string, data: UpdatePaymentDTO) {
    await this.database.reservation.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }

  async updatePaymentWithTransaction(database: TransactionPrisma, id: string, data: UpdatePaymentDTO) {
    await database.reservation.update({
      where: {
        id,
      },
      data: {
        ...data,
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
