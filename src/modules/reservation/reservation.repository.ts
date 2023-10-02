import { Injectable } from '@nestjs/common';

import type { Prisma } from '@prisma/client';
import { flatMap } from 'lodash';

import { getRandom } from '@/common';
import { getVatCost } from '@/common/vat';
import { PrismaService, TransactionPrisma } from '@/database/prisma.service';
import type { CommonReservation } from '@/interface/reservation.interface';

import { CreatePaymentDTO, ReservationDetailDTO, ReservationDTO, UpdatePaymentDTO, UpdateReservationDTO } from './dto';
import { RESERVATION_ERROR_CODE } from './exception/errorCode';
import { ReservationException } from './exception/reservation.exception';

@Injectable()
export class ReservationRepository {
  constructor(private readonly database: PrismaService) {}

  async findFirstReservation(args = {} as Prisma.ReservationFindFirstArgs, userId?: string) {
    const reservation = await this.database.reservation.findFirst({
      ...args,
      where: args.where,
      include: ReservationDTO.generateReservationInclude(userId),
      orderBy: args.orderBy,
    });

    return reservation ? new ReservationDTO(ReservationDTO.generateReservationDTO(reservation)) : null;
  }

  async findReservation(id: string, userId?: string) {
    const reservation = (await this.database.reservation.findUnique({
      where: {
        id,
      },
      include: ReservationDTO.generateReservationInclude(userId),
    })) as CommonReservation | undefined;

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_NOT_FOUND);
    }

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }

  async findReservationByOrderId(orderId: string, userId?: string) {
    const reservation = (await this.database.reservation.findUnique({
      where: {
        orderId,
      },
      include: ReservationDTO.generateReservationInclude(userId),
    })) as CommonReservation | undefined;

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_NOT_FOUND);
    }

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }
  async checkReservationByOrderId(orderId: string, userId?: string) {
    const reservation = (await this.database.reservation.findUnique({
      where: {
        orderId,
      },
      include: ReservationDTO.generateReservationInclude(userId),
    })) as CommonReservation | undefined;

    if (!reservation) {
      return null;
    }

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }

  async findReservationByOrderResultId(orderResultId: string, userId?: string) {
    const reservation = (await this.database.reservation.findUnique({
      where: {
        orderResultId,
      },
      include: ReservationDTO.generateReservationInclude(userId),
    })) as CommonReservation | undefined;

    if (!reservation) {
      throw new ReservationException(RESERVATION_ERROR_CODE.RESERVATION_NOT_FOUND);
    }

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }

  async countReservations(args = {} as Prisma.ReservationCountArgs) {
    return this.database.reservation.count(args);
  }

  async findReservations(args = {} as Prisma.ReservationFindManyArgs, userId?: string) {
    const reservations = (await this.database.reservation.findMany({
      ...args,
      where: {
        ...args.where,
      },
      include: ReservationDTO.generateReservationInclude(userId),
      orderBy: {
        createdAt: 'desc',
        ...args.orderBy,
      },
    })) as CommonReservation[];

    return reservations.map((reservation) => new ReservationDTO(ReservationDTO.generateReservationDTO(reservation)));
  }

  //TODO: 결제 시스템까지 도입
  async createPayment(userId: string, data: CreatePaymentDTO, isApproved?: boolean) {
    const { rentalTypes, spaceId, userCouponIds, ...rest } = data;
    const vatCost = getVatCost(rest.totalCost);
    const additionalServices = flatMap(rentalTypes.map((rentalType) => rentalType.additionalServices)).filter(Boolean);

    const reservation = (await this.database.reservation.create({
      data: {
        ...rest,

        user: {
          connect: {
            id: userId,
          },
        },
        space: {
          connect: {
            id: spaceId,
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
              },
              count: service.count,
            })),
          },
        }),
        vatCost,
        isApproved: typeof isApproved === 'boolean' ? isApproved : true,
        year: Number(rest.year),
        month: Number(rest.month),
        day: Number(rest.day),
        code: `${new Date().getTime()}${getRandom(10, 99)}`,
      },
      include: ReservationDTO.generateReservationInclude(userId),
    })) as CommonReservation;

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }

  async createReservationWithTransaction(database: TransactionPrisma, userId: string, data: CreatePaymentDTO) {
    const { rentalTypes, spaceId, userCouponIds, ...rest } = data;
    const vatCost = getVatCost(rest.totalCost);

    const additionalServices = flatMap(rentalTypes.map((rentalType) => rentalType.additionalServices)).filter(Boolean);

    const reservation = (await database.reservation.create({
      data: {
        ...rest,
        year: Number(rest.year),
        month: Number(rest.month),
        day: Number(rest.day),
        code: `${new Date().getTime()}${getRandom(10, 99)}`,
        user: {
          connect: {
            id: userId,
          },
        },
        space: {
          connect: {
            id: spaceId,
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
              },
              count: service.count,
            })),
          },
        }),
        vatCost,
      },
      include: ReservationDTO.generateReservationInclude(userId),
    })) as CommonReservation;

    return new ReservationDetailDTO(ReservationDetailDTO.generateReservationDetailDTO(reservation));
  }

  async updateReservation(id: string, data: UpdateReservationDTO) {
    const { cancel, ...rest } = data;
    await this.database.reservation.update({
      where: {
        id,
      },
      data: {
        ...rest,
        year: data.year ? Number(data.year) : undefined,
        month: data.month ? Number(data.month) : undefined,
        day: data.day ? Number(data.day) : undefined,
        approvedAt: data.isApproved ? new Date() : null,
        ...(cancel && {
          cancel: {
            create: {
              reason: cancel.reason,
              ...(cancel.hostId && {
                host: {
                  connect: {
                    id: cancel.hostId,
                  },
                },
              }),
              ...(cancel.userId && {
                user: {
                  connect: {
                    id: cancel.userId,
                  },
                },
              }),
            },
          },
        }),
      },
    });
  }

  async updatePayment(id: string, data: UpdatePaymentDTO) {
    const { cancel, ...rest } = data;
    await this.database.reservation.update({
      where: {
        id,
      },
      data: {
        ...rest,
        ...(cancel && {
          cancel: {
            create: {
              refundCost: cancel.refundCost ?? undefined,
              reason: cancel.reason,
              ...(cancel.hostId && {
                host: {
                  connect: {
                    id: cancel.hostId,
                  },
                },
              }),
              ...(cancel.userId && {
                user: {
                  connect: {
                    id: cancel.userId,
                  },
                },
              }),
            },
          },
        }),
      },
    });
  }

  async updatePaymentWithTransaction(database: TransactionPrisma, id: string, data: UpdatePaymentDTO) {
    const { cancel, ...rest } = data;
    await database.reservation.update({
      where: {
        id,
      },
      data: {
        ...rest,
        ...(cancel && {
          cancel: {
            create: {
              reason: cancel.reason,
              ...(cancel.hostId && {
                host: {
                  connect: {
                    id: cancel.hostId,
                  },
                },
              }),
              ...(cancel.userId && {
                user: {
                  connect: {
                    id: cancel.userId,
                  },
                },
              }),
            },
          },
        }),
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

  async hardDeleteReservation(id: string) {
    await this.database.reservation.delete({
      where: {
        id,
      },
    });
  }
}
