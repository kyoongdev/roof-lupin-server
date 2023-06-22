import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { KakaoPayProvider } from '@/common/payment';
import { TossPayProvider } from '@/common/payment/toss';
import { PrismaService } from '@/database/prisma.service';
import { TossCreatePaymentRequest } from '@/interface/payment/toss.interface';

import { CreatePaymentDTO, PayMethod } from '../reservation/dto';
import { RESERVATION_COST_BAD_REQUEST, RESERVATION_ERROR_CODE } from '../reservation/exception/errorCode';
import { ReservationException } from '../reservation/exception/reservation.exception';
import { ReservationRepository } from '../reservation/reservation.repository';
import { PossiblePackageDTO, PossibleRentalTypeDTO } from '../space/dto/rentalType';
import { RENTAL_TYPE_ENUM } from '../space/dto/validation/rental-type.validation';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { RentalTypeService } from '../space/rentalType/rentalType.service';

import { ApproveKakaoPaymentDTO, ConfirmTossPaymentDTO, CreateTossPaymentDTO, PrepareKakaoPaymentDTO } from './dto';
import {
  PAYMENT_CONFLICT,
  PAYMENT_DATE_BAD_REQUEST,
  PAYMENT_ERROR_CODE,
  PAYMENT_ORDER_RESULT_ID_BAD_REQUEST,
  PAYMENT_PAY_METHOD_BAD_REQUEST,
  PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR,
  PAYMENT_TOTAL_COST_BAD_REQUEST,
} from './exception/errorCode';
import { PaymentException } from './exception/payment.exception';

@Injectable()
export class PaymentService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly rentalTypeService: RentalTypeService,
    private readonly kakaoPay: KakaoPayProvider,
    private readonly tossPay: TossPayProvider,
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

  async prepareKakaoPayment(userId: string, data: CreatePaymentDTO) {
    const totalCost = data.originalCost - data.discountCost;

    if (totalCost !== data.totalCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
    }
    //TODO: 쿠폰 적용
    const result = await this.database.$transaction(async (database) => {
      const { rentalType } = await this.validatePayment(data);
      const reservation = await this.reservationRepository.createReservationWithTransaction(database, userId, data);
      try {
        const orderId = this.createOrderId();

        const result = await this.kakaoPay.preparePayment({
          item_name: rentalType.name,
          quantity: 1,
          tax_free_amount: reservation.taxFreeCost,
          total_amount: reservation.totalCost,
          partner_order_id: orderId,
        });

        await this.reservationRepository.updatePaymentWithTransaction(database, reservation.id, {
          orderId,
          orderResultId: result.tid,
          payMethod: PayMethod.KAKAO_PAY,
        });

        return new PrepareKakaoPaymentDTO({
          ...result,
          orderId,
          orderResultId: result.tid,
        });
      } catch (err) {
        await this.reservationRepository.deleteReservation(reservation.id);
        throw new InternalServerErrorException('결제 처리 중 오류가 발생했습니다.');
      }
    });
    return result;
  }

  async approveKakaoPayment(data: ApproveKakaoPaymentDTO) {
    const reservation = await this.reservationRepository.findReservationByOrderId(data.orderId);

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
    //TODO: 쿠폰 적용
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

    if (data.paymentKey !== reservation.orderResultId) {
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
    return reservation.id;
  }

  createOrderId() {
    const code = nanoid(5);
    return `${new Date().getDate()}_${code.toUpperCase()}`;
  }

  async validatePayment(data: CreatePaymentDTO) {
    const rentalType = await this.rentalTypeRepository.findRentalType(data.rentalTypeId);
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

      const realCost = (possibleRentalType as PossibleRentalTypeDTO).timeCostInfos.reduce<number>((acc, next) => {
        if (data.startAt <= next.time && next.time <= data.endAt) {
          acc += next.cost;
        }
        return acc;
      }, 0);

      //INFO: 가격 정보가 올바르지 않을 때
      if (realCost !== data.originalCost) {
        throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
      }
    } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
      //INFO: 대여하려는 시간이 잘못 입력됐을 때
      if (data.startAt !== possibleRentalType.startAt || data.endAt !== possibleRentalType.endAt) {
        throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_DATE_BAD_REQUEST));
      }

      //INFO: 가격 정보가 올바르지 않을 때
      if (rentalType.baseCost !== data.originalCost) {
        throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
      }

      //INFO: 대여하려는 시간이 예약 불가할 때
      if (!(possibleRentalType as PossiblePackageDTO).isPossible) {
        throw new PaymentException(PAYMENT_ERROR_CODE.CONFLICT(PAYMENT_CONFLICT));
      }
    } else
      throw new PaymentException(PAYMENT_ERROR_CODE.INTERNAL_SERVER_ERROR(PAYMENT_RENTAL_TYPE_INTERNAL_SERVER_ERROR));
    return {
      rentalType,
      possibleRentalType,
    };
  }
}
