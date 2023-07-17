import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { flatMap } from 'lodash';

import { reservationInclude } from '@/common/constants/query';
import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import type { CommonReservation } from '@/interface/reservation.interface';

import {
  CreatePaymentDTO,
  CreateReservationDTO,
  ReservationDetailDTO,
  ReservationDTO,
  UpdatePaymentDTO,
  UpdateReservationDTO,
} from './dto';
import { RESERVATION_ERROR_CODE, RESERVATION_NOT_FOUND } from './exception/errorCode';
import { ReservationException } from './exception/reservation.exception';

@Injectable()
export class ReservationRepository {
  constructor(private readonly database: PrismaService) {}

  async findReservation(id: string) {
    const reservation = (await this.database.reservation.findUnique({
      where: {
        id,
      },
      include: reservationInclude,
    })) as CommonReservation | undefined;

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }

  async findReservationByOrderId(orderId: string) {
    const reservation = (await this.database.reservation.findUnique({
      where: {
        orderId,
      },
      include: reservationInclude,
    })) as CommonReservation | undefined;

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }

  async findReservationByOrderResultId(orderResultId: string) {
    const reservation = (await this.database.reservation.findUnique({
      where: {
        orderResultId,
      },
      include: reservationInclude,
    })) as CommonReservation | undefined;

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.NOT_FOUND(RESERVATION_NOT_FOUND));
    }

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }

  async countReservations(args = {} as Prisma.ReservationCountArgs) {
    return this.database.reservation.count(args);
  }

  async findReservations(args = {} as Prisma.ReservationFindManyArgs) {
    const reservations = (await this.database.reservation.findMany({
      where: {
        ...args.where,
      },
      include: reservationInclude,
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
      ...args,
    })) as CommonReservation[];

    return reservations.map((reservation) => new ReservationDTO(ReservationDTO.generateReservationDTO(reservation)));
  }

  //TODO: 결제 시스템까지 도입
  async createPayment(userId: string, data: CreatePaymentDTO, isApproved?: boolean) {
    const { rentalTypes, spaceId, userCouponIds, ...rest } = data;
    const taxCost = Math.floor(rest.totalCost / 1.1);
    const additionalServices = flatMap(rentalTypes.map((rentalType) => rentalType.additionalServices));

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
        ...(additionalServices.length > 0 && {
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
        isApproved: typeof isApproved === 'boolean' ? isApproved : true,
        ...rest,
      },
    });
    return reservation.id;
  }

  async createReservationWithTransaction(database: TransactionPrisma, userId: string, data: CreatePaymentDTO) {
    const { rentalTypes, spaceId, userCouponIds, ...rest } = data;
    const taxCost = Math.floor(rest.totalCost / 1.1);
    const additionalServices = flatMap(rentalTypes.map((rentalType) => rentalType.additionalServices));

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
        ...(additionalServices.length > 0 && {
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
