import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { KakaoPayProvider } from '@/common/payment';
import { PortOneProvider } from '@/common/payment/port-one';
import { TossPayProvider } from '@/common/payment/toss';
import { PrismaService } from '@/database/prisma.service';

import { CouponRepository } from '../coupon/coupon.repository';
import { DISCOUNT_TYPE_ENUM } from '../coupon/validation';
import { CreatePaymentDTO, PayMethod } from '../reservation/dto';
import { RESERVATION_COST_BAD_REQUEST, RESERVATION_ERROR_CODE } from '../reservation/exception/errorCode';
import { ReservationException } from '../reservation/exception/reservation.exception';
import { ReservationRepository } from '../reservation/reservation.repository';
import { PossiblePackageDTO, PossibleRentalTypeDTO } from '../space/dto/rentalType';
import { RENTAL_TYPE_ENUM } from '../space/dto/validation/rental-type.validation';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { RentalTypeService } from '../space/rentalType/rentalType.service';
import { SpaceRepository } from '../space/space.repository';

import {
  ApproveKakaoPaymentDTO,
  CompletePortOnePaymentDTO,
  ConfirmTossPaymentDTO,
  CreateTossPaymentDTO,
  PortOnePreparePaymentDTO,
  PrepareKakaoPaymentDTO,
  RefundPaymentDTO,
} from './dto';
import {
  PAYMENT_ALREADY_REFUNDED,
  PAYMENT_CONFLICT,
  PAYMENT_COUPON_COUNT_ZERO,
  PAYMENT_COUPON_DUE_DATE_BEFORE,
  PAYMENT_COUPON_DUE_DATE_EXPIRED,
  PAYMENT_COUPON_IS_USED,
  PAYMENT_DATE_BAD_REQUEST,
  PAYMENT_DISCOUNT_COST_BAD_REQUEST,
  PAYMENT_ERROR_CODE,
  PAYMENT_INTERNAL_SERVER_ERROR,
  PAYMENT_MERCHANT_UID_BAD_REQUEST,
  PAYMENT_NOT_COMPLETED,
  PAYMENT_ORDER_RESULT_ID_BAD_REQUEST,
  PAYMENT_PAY_METHOD_BAD_REQUEST,
  PAYMENT_REFUND_FORBIDDEN,
  PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR,
  PAYMENT_SPACE_ID_BAD_REQUEST,
  PAYMENT_TOTAL_COST_BAD_REQUEST,
} from './exception/errorCode';
import { PaymentException } from './exception/payment.exception';
//TODO: 환불 로직 추가
@Injectable()
export class PaymentService {
  constructor(
    private readonly spaceRepository: SpaceRepository,
    private readonly reservationRepository: ReservationRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly rentalTypeService: RentalTypeService,
    private readonly couponRepository: CouponRepository,
    private readonly kakaoPay: KakaoPayProvider,
    private readonly tossPay: TossPayProvider,
    private readonly portOne: PortOneProvider,
    private readonly database: PrismaService
  ) {}

  async testKakaoPayment() {
    const result = await this.kakaoPay.preparePayment({
      item_name: 'test',
      quantity: 1,
      tax_free_amount: 0,
      total_amount: 100,
      partner_order_id: this.createOrderId(),
    });

    return result;
  }

  async preparePortOnePayment(userId: string, data: CreatePaymentDTO) {
    const totalCost = data.originalCost - data.discountCost;

    if (totalCost !== data.totalCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
    }

    const result = await this.database.$transaction(async (database) => {
      const { rentalType } = await this.validatePayment(data);

      const reservation = await this.reservationRepository.createReservationWithTransaction(database, userId, data);
      try {
        const orderId = this.createOrderId();

        await this.portOne.preparePayment({
          amount: reservation.totalCost,
          merchant_uid: orderId,
        });

        await this.reservationRepository.updatePaymentWithTransaction(database, reservation.id, {
          orderId,
          payMethod: PayMethod.PORT_ONE,
        });

        return new PortOnePreparePaymentDTO({
          amount: reservation.totalCost,
          merchant_uid: orderId,
          name: rentalType.name,
        });
      } catch (err) {
        await this.reservationRepository.deleteReservation(reservation.id);
        throw new InternalServerErrorException('결제 처리 중 오류가 발생했습니다.');
      }
    });
    return result;
  }

  async completePortOnePayment(props: CompletePortOnePaymentDTO) {
    const reservation = await this.reservationRepository.findReservationByOrderId(props.merchant_uid);
    try {
      const payment = await this.portOne.completePayment({ imp_uid: props.imp_uid });

      if (!payment) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_ORDER_RESULT_ID_BAD_REQUEST));
      }

      if (payment.amount !== reservation.totalCost) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
      }

      if (reservation.payMethod !== PayMethod.PORT_ONE) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_PAY_METHOD_BAD_REQUEST));
      }

      if (payment.status !== 'paid') {
        throw new PaymentException(PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_INTERNAL_SERVER_ERROR));
      }

      await this.reservationRepository.updatePayment(reservation.id, {
        orderResultId: props.imp_uid,
        payedAt: new Date(),
      });
    } catch (err) {
      await this.reservationRepository.deleteReservation(reservation.id);
      throw new PaymentException(PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_INTERNAL_SERVER_ERROR));
    }

    return reservation.id;
  }

  async prepareKakaoPayment(userId: string, data: CreatePaymentDTO) {
    const totalCost = data.originalCost - data.discountCost;

    if (totalCost !== data.totalCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
    }

    const result = await this.database.$transaction(async (database) => {
      const { rentalType } = await this.validatePayment(data);
      const reservation = await this.reservationRepository.createReservationWithTransaction(database, userId, data);
      try {
        const orderId = this.createOrderId();

        const result = await this.kakaoPay.preparePayment({
          item_name: rentalType.name,
          quantity: 1,
          tax_free_amount: 0,
          total_amount: reservation.totalCost,
          partner_order_id: orderId,
        });

        await this.reservationRepository.updatePaymentWithTransaction(database, reservation.id, {
          orderId,
          orderResultId: result.tid,
          payMethod: PayMethod.KAKAO_PAY,
        });
        await Promise.all(
          data.userCouponIds.map(async (couponId) => {
            await this.couponRepository.findUserCoupon(couponId);
            await this.couponRepository.useUserCoupon(database, couponId);
          })
        );

        return new PrepareKakaoPaymentDTO({
          ...result,
          orderId,
          orderResultId: result.tid,
        });
      } catch (err) {
        await Promise.all(
          data.userCouponIds.map(async (couponId) => {
            await this.couponRepository.resetUserCoupon(couponId);
          })
        );
        await this.reservationRepository.deleteReservation(reservation.id);
        throw new InternalServerErrorException('결제 처리 중 오류가 발생했습니다.');
      }
    });
    return result;
  }

  async approveKakaoPayment(data: ApproveKakaoPaymentDTO) {
    const reservation = await this.reservationRepository.findReservationByOrderId(data.orderId);
    const coupons = await this.couponRepository.findUserCoupons({
      where: {
        userId: reservation.user.id,
        reservationId: reservation.id,
      },
    });
    try {
      if (data.orderResultId !== reservation.orderResultId) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_ORDER_RESULT_ID_BAD_REQUEST));
      }
      if (reservation.payMethod !== PayMethod.KAKAO_PAY) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_PAY_METHOD_BAD_REQUEST));
      }

      await this.kakaoPay.approvePayment({
        partner_order_id: reservation.orderId,
        tid: reservation.orderResultId,
        pg_token: data.pg_token,
        total_amount: reservation.totalCost,
      });

      await this.reservationRepository.updatePayment(reservation.id, {
        payedAt: new Date(),
      });
    } catch (err) {
      await Promise.all(
        coupons.map(async (coupon) => {
          await this.couponRepository.resetUserCoupon(coupon.id);
        })
      );
      await this.reservationRepository.deleteReservation(reservation.id);
      throw new PaymentException(PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_INTERNAL_SERVER_ERROR));
    }

    return reservation.id;
  }

  async testTossPayment() {
    const result = await this.tossPay.createPayment({
      amount: 100,
      orderName: 'test',
      method: '카드',
      orderId: this.createOrderId(),
    });

    return result;
  }

  async createTossPayment(userId: string, data: CreatePaymentDTO) {
    const totalCost = data.originalCost - data.discountCost;

    if (totalCost !== data.totalCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
    }

    if (totalCost !== data.totalCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
    }

    const result = await this.database.$transaction(async (database) => {
      const { rentalType } = await this.validatePayment(data);
      const reservation = await this.reservationRepository.createReservationWithTransaction(database, userId, data);
      try {
        const orderId = this.createOrderId();

        const result = await this.tossPay.createPayment({
          amount: reservation.totalCost,
          orderName: rentalType.name,
          method: '카드',
          orderId,
        });

        await this.reservationRepository.updatePaymentWithTransaction(database, reservation.id, {
          orderId,
          orderResultId: result.paymentKey,
          payMethod: PayMethod.TOSS_PAY,
        });

        await Promise.all(
          data.userCouponIds.map(async (couponId) => {
            await this.couponRepository.findUserCoupon(couponId);
            await this.couponRepository.useUserCoupon(database, couponId);
          })
        );

        return new CreateTossPaymentDTO({
          url: result.checkout.url,
        });
      } catch (err) {
        await this.reservationRepository.deleteReservation(reservation.id);
        throw new InternalServerErrorException('결제 처리 중 오류가 발생했습니다.');
      }
    });
    return result;
  }

  async confirmTossPayment(data: ConfirmTossPaymentDTO) {
    const { paymentKey } = data;
    const reservation = await this.reservationRepository.findReservationByOrderResultId(paymentKey);
    const coupons = await this.couponRepository.findUserCoupons({
      where: {
        userId: reservation.user.id,
        reservationId: reservation.id,
      },
    });
    try {
      if (data.orderId !== reservation.orderId || data.amount !== reservation.totalCost) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_ORDER_RESULT_ID_BAD_REQUEST));
      }

      if (reservation.payMethod !== PayMethod.TOSS_PAY) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_PAY_METHOD_BAD_REQUEST));
      }

      await this.tossPay.confirmPayment({
        amount: reservation.totalCost,
        orderId: reservation.orderId,
        paymentKey: reservation.orderResultId,
      });

      await this.reservationRepository.updatePayment(reservation.id, {
        payedAt: new Date(),
      });
    } catch (err) {
      await Promise.all(
        coupons.map(async (coupon) => {
          await this.couponRepository.resetUserCoupon(coupon.id);
        })
      );
      await this.reservationRepository.deleteReservation(reservation.id);
      throw new PaymentException(PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_INTERNAL_SERVER_ERROR));
    }

    return reservation.id;
  }

  async refundPayment(userId: string, data: RefundPaymentDTO) {
    const reservation = await this.reservationRepository.findReservation(data.reservationId);
    //TODO: 기간에 따른 환불금 정하기
    const refundCost = reservation.totalCost;
    const taxCost = Math.floor(refundCost / 1.1);

    if (reservation.user.id !== userId) {
      throw new PaymentException(PAYMENT_ERROR_CODE.FORBIDDEN(PAYMENT_REFUND_FORBIDDEN));
    }

    if (!reservation.payedAt) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_NOT_COMPLETED));
    }

    const cancelableAmount = reservation.totalCost - reservation.refundCost;
    if (cancelableAmount <= 0) {
      throw new PaymentException(PAYMENT_ERROR_CODE.CONFLICT(PAYMENT_ALREADY_REFUNDED));
    }

    if (reservation.payMethod === PayMethod.KAKAO_PAY) {
      await this.kakaoPay.cancelPayment({
        cancel_amount: refundCost,
        cancel_tax_free_amount: 0,
        cancel_vat_amount: taxCost,
        tid: reservation.orderResultId,
      });
    } else if (reservation.payMethod === PayMethod.TOSS_PAY) {
      await this.tossPay.cancelPaymentByPaymentKey(reservation.orderResultId, {
        cancelAmount: refundCost,
        cancelReason: '사용자 환불 요청',
      });
    } else if (reservation.payMethod === PayMethod.PORT_ONE) {
      if (!data.merchant_uid) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_MERCHANT_UID_BAD_REQUEST));
      }

      // await this.portOne.
    } else {
      throw new PaymentException(PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_INTERNAL_SERVER_ERROR));
    }

    await this.reservationRepository.updatePayment(reservation.id, {
      refundCost,
    });
  }

  createOrderId() {
    const code = nanoid(5);
    return `${new Date().getTime()}_${code.toUpperCase()}`;
  }

  async validatePayment(data: CreatePaymentDTO) {
    const rentalType = await this.rentalTypeRepository.findRentalType(data.rentalTypeId);

    if (rentalType.spaceId !== data.spaceId) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_SPACE_ID_BAD_REQUEST));
    }

    const possibleRentalType = await this.rentalTypeService.findPossibleRentalTypesById(data.rentalTypeId, {
      year: data.year,
      month: data.month,
      day: data.day,
    });

    //INFO: 요청한 시간이 대여 정보의 시작시간과 끝나는 시간에 포함되지 않을 때
    if (data.startAt < possibleRentalType.startAt || possibleRentalType.endAt < data.endAt) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_DATE_BAD_REQUEST));
    }

    if (rentalType.rentalType === RENTAL_TYPE_ENUM.TIME) {
      //INFO: 시간 대여 타입에 시간 정보가 없을 때
      if (!possibleRentalType['timeCostInfos']) {
        throw new PaymentException(PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR));
      }

      //INFO: 대여하려는 시간이 예약 불가할 때
      (possibleRentalType as PossibleRentalTypeDTO).timeCostInfos.forEach((time) => {
        if (data.startAt <= time.time && time.time <= data.endAt && !time.isPossible) {
          throw new PaymentException(PAYMENT_ERROR_CODE.CONFLICT(PAYMENT_CONFLICT));
        }
      });

      const cost = (possibleRentalType as PossibleRentalTypeDTO).timeCostInfos.reduce<number>((acc, next) => {
        if (data.startAt <= next.time && next.time <= data.endAt) {
          acc += next.cost;
        }
        return acc;
      }, 0);
      const realCost = await this.getRealCost(cost, data);
      //INFO: 가격 정보가 올바르지 않을 때
      if (realCost !== data.totalCost || cost !== data.originalCost) {
        throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
      }
    } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
      //INFO: 대여하려는 시간이 잘못 입력됐을 때
      if (data.startAt !== possibleRentalType.startAt || data.endAt !== possibleRentalType.endAt) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_DATE_BAD_REQUEST));
      }
      //INFO: 대여하려는 시간이 예약 불가할 때
      if (!(possibleRentalType as PossiblePackageDTO).isPossible) {
        throw new PaymentException(PAYMENT_ERROR_CODE.CONFLICT(PAYMENT_CONFLICT));
      }
      const realCost = await this.getRealCost(rentalType.baseCost, data);
      //INFO: 가격 정보가 올바르지 않을 때
      if (rentalType.baseCost !== data.originalCost || realCost !== data.totalCost) {
        throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
      }
    } else
      throw new PaymentException(PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR));
    return {
      rentalType,
      possibleRentalType,
    };
  }

  async getRealCost(cost: number, data: CreatePaymentDTO) {
    let discountCost = 0;
    let additionalCost = 0;

    if (data.userCouponIds) {
      const userCoupons = await this.couponRepository.findUserCoupons({
        where: {
          OR: data.userCouponIds.map((id) => ({ id })),
        },
      });
      await Promise.all(
        data.userCouponIds.map(async (couponId) => {
          const isExist = userCoupons.find((userCoupon) => userCoupon.id === couponId);
          if (isExist) {
            if (isExist.isUsed) {
              throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_COUPON_IS_USED));
            }
            if (isExist.count === 0) {
              throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_COUPON_COUNT_ZERO));
            }

            const dueDateStart = isExist.dueDateStartAt.getTime();
            const dueDateEnd = isExist.dueDateEndAt.getTime();
            const currentDate = new Date().getTime();

            if (dueDateStart > currentDate) {
              throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_COUPON_DUE_DATE_BEFORE));
            }

            if (dueDateEnd < currentDate) {
              if (!isExist.isUsed) {
                await this.couponRepository.updateUserCoupon(isExist.id, { isUsed: true });
              }
              throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_COUPON_DUE_DATE_EXPIRED));
            }

            if (isExist.coupon.discountType === DISCOUNT_TYPE_ENUM.PERCENTAGE) {
              discountCost += cost * (isExist.coupon.discountValue / 100);
            } else if (isExist.coupon.discountType === DISCOUNT_TYPE_ENUM.VALUE) {
              discountCost += isExist.coupon.discountValue;
            } else throw new InternalServerErrorException('쿠폰이 잘못되었습니다.');
          }
        })
      );
    }

    if (data.discountCost !== discountCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_DISCOUNT_COST_BAD_REQUEST));
    }

    const space = await this.spaceRepository.findSpace(data.spaceId);

    if (data.additionalServices) {
      data.additionalServices.forEach((service) => {
        const isExist = space.additionalServices.find((additionalService) => additionalService.id === service.id);
        if (isExist) {
          additionalCost += isExist.cost * service.count;
        }
      });
    }
    if (space.overflowUserCount < data.userCount) {
      const userCount = data.userCount - space.overflowUserCount;
      additionalCost += space.overflowUserCost * userCount;
    }
    return cost - discountCost + additionalCost;
  }
}
