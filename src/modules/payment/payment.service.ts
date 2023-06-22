import { Injectable } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { KakaoPayProvider } from '@/common/payment';
import { TossPayProvider } from '@/common/payment/toss';
import { PrismaService } from '@/database/prisma.service';

import { CreatePaymentDTO } from '../reservation/dto';
import { RESERVATION_COST_BAD_REQUEST, RESERVATION_ERROR_CODE } from '../reservation/exception/errorCode';
import { ReservationException } from '../reservation/exception/reservation.exception';
import { ReservationRepository } from '../reservation/reservation.repository';
import { PossiblePackageDTO, PossibleRentalTypeDTO } from '../space/dto/rentalType';
import { RENTAL_TYPE_ENUM } from '../space/dto/validation/rental-type.validation';
import { RENTAL_TYPE_ERROR, SPACE_ERROR_CODE } from '../space/exception/errorCode';
import { SpaceException } from '../space/exception/space.exception';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';
import { RentalTypeService } from '../space/rentalType/rentalType.service';

import { ApproveKakaoPaymentDTO, PrepareKakaoPaymentDTO } from './dto';
import {
  PAYMENT_CONFLICT,
  PAYMENT_DATE_BAD_REQUEST,
  PAYMENT_ERROR_CODE,
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

  async prepareKakaoPayment(userId: string, data: CreatePaymentDTO) {
    const totalCost = data.originalCost - data.discountCost;

    if (totalCost !== data.totalCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
    }
    //TODO: 쿠폰 적용
    this.database.$transaction(async (database) => {
      const { possibleRentalType, rentalType } = await this.validatePayment(data);
      const reservation = await this.reservationRepository.createReservationWithTransaction(database, userId, data);

      const orderId = this.createOrderId();
      const result = await this.kakaoPay.preparePayment({
        item_name: rentalType.name,
        quantity: 1,
        tax_free_amount: reservation.taxFreeCost,
        total_amount: reservation.totalCost,
        partner_order_id: orderId,
      });

      await this.reservationRepository.updatePayment(reservation.id, {
        orderId,
        orderResultId: result.tid,
      });

      return new PrepareKakaoPaymentDTO({
        ...result,
        orderId,
        orderResultId: result.tid,
      });
    });
  }

  async approveKakaoPayment(data: ApproveKakaoPaymentDTO) {
    const reservation = await this.reservationRepository.findReservationByOrderId(data.orderId);

    // if(data.orderResultId !== reservation.) {

    // }
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
