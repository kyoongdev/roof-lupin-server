import { Injectable } from '@nestjs/common';

import { nanoid } from 'nanoid';

import { KakaoPayProvider } from '@/common/payment';
import { TossPayProvider } from '@/common/payment/toss';

import { CreatePaymentDTO } from '../reservation/dto';
import { ReservationRepository } from '../reservation/reservation.repository';
import { RENTAL_TYPE_ENUM } from '../space/dto/validation/rental-type.validation';
import { RENTAL_TYPE_ERROR, SPACE_ERROR_CODE } from '../space/exception/errorCode';
import { SpaceException } from '../space/exception/space.exception';
import { RentalTypeRepository } from '../space/rentalType/rentalType.repository';

import { ApproveKakaoPaymentDTO, PrepareKakaoPaymentDTO } from './dto';
import { PAYMENT_ERROR_CODE, PAYMENT_TOTAL_COST_BAD_REQUEST } from './exception/errorCode';
import { PaymentException } from './exception/payment.exception';

@Injectable()
export class PaymentService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    private readonly rentalTypeRepository: RentalTypeRepository,
    private readonly kakaoPay: KakaoPayProvider,
    private readonly tossPay: TossPayProvider
  ) {}

  async prepareKakaoPayment(userId: string, data: CreatePaymentDTO) {
    const totalCost = data.originalCost - data.discountCost;

    if (totalCost !== data.totalCost) {
      throw new PaymentException(PAYMENT_ERROR_CODE.BAD_REQUEST(PAYMENT_TOTAL_COST_BAD_REQUEST));
    }

    //TODO: 쿠폰 적용
    const reservation = await this.reservationRepository.createReservation(userId, data);
    const rentalType = await this.rentalTypeRepository.findRentalType(data.rentalTypeId);
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

  async validateReservation(data: CreatePaymentDTO) {
    const { rentalTypeId } = data;
    const rentalType = await this.rentalTypeRepository.findRentalType(rentalTypeId);
    const existingReservations = await this.reservationRepository.findReservations({
      where: {
        rentalTypeId,
        year: data.year,
        month: data.month,
        day: data.day,
      },
    });

    //INFO: 예약 시도하는 시간에 예약된 건이 있는지 여부 확인
    if (existingReservations.length > 0) {
      data.validateIsReservationExist(existingReservations);
    }

    if (rentalType.rentalType === RENTAL_TYPE_ENUM.TIME) {
      data.validateTimeReservation(rentalType);
    } else if (rentalType.rentalType === RENTAL_TYPE_ENUM.PACKAGE) {
      data.validatePackageReservation(rentalType);
    } else throw new SpaceException(SPACE_ERROR_CODE.INTERNAL_SERVER_ERROR(RENTAL_TYPE_ERROR));
  }
}
