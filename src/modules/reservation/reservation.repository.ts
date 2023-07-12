import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';

import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import type { CommonReservationRentalType } from '@/interface/reservation.interface';

import { CreatePaymentDTO, ReservationDetailDTO, ReservationDTO, UpdatePaymentDTO, UpdateReservationDTO } from './dto';
import { RESERVATION_ERROR_CODE, RESERVATION_NOT_FOUND } from './exception/errorCode';
import { ReservationException } from './exception/reservation.exception';

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
    });

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    const { rentalTypes, ...rest } = reservation;
    const { space } = (rentalTypes[0] as CommonReservationRentalType).rentalType;
    const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;

    return new ReservationDetailDTO({
      ...rest,
      rentalTypes: (rentalTypes as CommonReservationRentalType[]).map((rentalType) => rentalType),
      space: {
        ...space,
        reviewCount: space.reviews.length,
        location: space.location?.['location'],
        averageScore,
      },
      isReviewed: rest.spaceReviews.length > 0,
    });
  }

  async findReservationByOrderId(orderId: string) {
    const reservation = await this.database.reservation.findUnique({
      where: {
        orderId,
      },
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
    });

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    const { rentalTypes, ...rest } = reservation;
    const { space } = (rentalTypes[0] as CommonReservationRentalType).rentalType;
    const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;

    return new ReservationDetailDTO({
      ...rest,
      rentalTypes: (rentalTypes as CommonReservationRentalType[]).map((rentalType) => rentalType),
      space: {
        ...space,
        reviewCount: space.reviews.length,
        location: space.location?.['location'],
        averageScore,
      },
      isReviewed: rest.spaceReviews.length > 0,
    });
  }

  async findReservationByOrderResultId(orderResultId: string) {
    const reservation = await this.database.reservation.findUnique({
      where: {
        orderResultId,
      },
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
    });

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    const { rentalTypes, ...rest } = reservation;
    const { space } = (rentalTypes[0] as CommonReservationRentalType).rentalType;
    const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;

    return new ReservationDetailDTO({
      ...rest,
      rentalTypes: (rentalTypes as CommonReservationRentalType[]).map((rentalType) => rentalType),
      space: {
        ...space,
        reviewCount: space.reviews.length,
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
        spaceReviews: {
          include: {
            space: true,
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
      const { rentalTypes, ...rest } = reservation;
      const { space } = (rentalTypes[0] as CommonReservationRentalType).rentalType;
      const averageScore = space.reviews.reduce((acc, cur) => acc + cur.score, 0) / space.reviews.length;

      return new ReservationDTO({
        ...rest,
        user: rest.user,
        rentalTypes: (rentalTypes as CommonReservationRentalType[]).map((rentalType) => rentalType),
        space: {
          ...space,
          reviewCount: space.reviews.length,
          location: space.location?.['location'],
          averageScore: averageScore,
        },
        isReviewed: reservation.spaceReviews ? reservation.spaceReviews.length > 0 : false,
      });
    });
  }

  //TODO: 결제 시스템까지 도입
  async createReservation(userId: string, data: CreatePaymentDTO) {
    const { rentalTypes, spaceId, userCouponIds, additionalServices, ...rest } = data;
    const taxCost = Math.floor(rest.totalCost / 1.1);

    const reservation = await this.database.reservation.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        rentalTypes: {
          create: rentalTypes.map((rentalType) => ({
            endAt: rentalType.endAt,
            startAt: rentalType.startAt,
            rentalType: {
              connect: {
                id: rentalType.rentalTypeId,
              },
            },
          })),
        },
        ...(userCouponIds && {
          userCoupon: {
            connect: userCouponIds.map((id) => ({ id })),
          },
        }),
        ...(additionalServices && {
          additionalServices: {
            create: additionalServices.map((service) => ({
              additionalService: {
                connect: {
                  id: service.id,
                },
                count: service.count,
              },
            })),
          },
        }),
        vatCost: rest.totalCost - taxCost,
        ...rest,
      },
    });
    return reservation;
  }

  async createReservationWithTransaction(database: TransactionPrisma, userId: string, data: CreatePaymentDTO) {
    const { rentalTypes, spaceId, userCouponIds, additionalServices, ...rest } = data;
    const taxCost = Math.floor(rest.totalCost / 1.1);

    const reservation = await database.reservation.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        rentalTypes: {
          create: rentalTypes.map((rentalType) => ({
            endAt: rentalType.endAt,
            startAt: rentalType.startAt,
            rentalType: {
              connect: {
                id: rentalType.rentalTypeId,
              },
            },
          })),
        },
        ...(userCouponIds && {
          userCoupon: {
            connect: userCouponIds.map((id) => ({ id })),
          },
        }),
        ...(additionalServices && {
          additionalServices: {
            create: additionalServices.map((service) => ({
              additionalService: {
                connect: {
                  id: service.id,
                },
                count: service.count,
              },
            })),
          },
        }),
        vatCost: rest.totalCost - taxCost,
        ...rest,
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
