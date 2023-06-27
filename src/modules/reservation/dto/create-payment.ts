import { Property } from 'wemacu-nestjs';

import {
  AdditionalServiceReservationDTO,
  AdditionalServiceReservationDTOProps,
} from '@/modules/space/dto/additionalService';
import { RentalTypeDTO } from '@/modules/space/dto/rentalType';
import { RENTAL_TYPE_ERROR, SPACE_ERROR_CODE } from '@/modules/space/exception/errorCode';
import { SpaceException } from '@/modules/space/exception/space.exception';

import {
  RESERVATION_COST_BAD_REQUEST,
  RESERVATION_ERROR_CODE,
  RESERVATION_TIME_BAD_REQUEST,
} from '../exception/errorCode';
import { ReservationException } from '../exception/reservation.exception';

import { ReservationDTO } from './reservation.dto';
import { TimeValidation } from './validation';

export interface CreatePaymentDTOProps {
  year: string;
  month: string;
  day: string;
  startAt: number;
  endAt: number;
  totalCost: number;
  userCount: number;
  discountCost: number;
  originalCost: number;
  rentalTypeId: string;
  spaceId: string;
  userCouponId?: string;
  additionalServices?: AdditionalServiceReservationDTOProps[];
}

export class CreatePaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '예약 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '예약 일' } })
  day: string;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '예약 시작 시간 (0 ~ 24)' } })
  startAt: number;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '예약 종료 시간 (0 ~ 24)' } })
  endAt: number;

  @Property({ apiProperty: { type: 'number', description: '이용 인원' } })
  userCount: number;

  @Property({ apiProperty: { type: 'number', description: '예약 비용' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인 금액' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인제외 예약 비용' } })
  originalCost: number;

  @Property({ apiProperty: { type: 'string', description: '대여 타입 아이디' } })
  rentalTypeId: string;

  @Property({ apiProperty: { type: 'string', description: '공간 아이디' } })
  spaceId: string;

  @Property({ apiProperty: { type: 'string', description: '유저가 가지고 있는 쿠폰 ID' } })
  userCouponId?: string;

  @Property({
    apiProperty: { type: AdditionalServiceReservationDTO, isArray: true, nullable: true, description: '추가 서비스들' },
  })
  additionalServices?: AdditionalServiceReservationDTO[];

  constructor(props?: CreatePaymentDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.totalCost = props.totalCost;
      this.rentalTypeId = props.rentalTypeId;
      this.spaceId = props.spaceId;
      this.userCount = props.userCount;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
      this.userCouponId = props.userCouponId;
      this.additionalServices = props.additionalServices?.map(
        (service) => new AdditionalServiceReservationDTO(service)
      );
    }
  }

  public validateIsReservationExist(existingReservations: ReservationDTO[]) {
    const isPossible = existingReservations.reduce<boolean>((acc, next) => {
      if (next.startAt <= this.startAt && this.startAt < next.endAt) {
        acc = false;
      }

      if (next.startAt < this.endAt && this.endAt <= next.endAt) {
        acc = false;
      }

      return acc;
    }, true);

    if (!isPossible) {
      throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_TIME_BAD_REQUEST));
    }
  }

  public validateTimeReservation(rentalType: RentalTypeDTO) {
    //INFO: 예약 시도하는 시간이 시작 시간보다 빠르거나 끝 시간보다 느린지 여부 확인
    if (rentalType.startAt > this.startAt || rentalType.endAt < this.endAt) {
      throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_TIME_BAD_REQUEST));
    }

    rentalType.timeCostInfos.sort((a, b) => a.time - b.time);
    //INFO: 대여 정보가 올바르지 않을 경우
    if (!rentalType.timeCostInfos) {
      throw new SpaceException(SPACE_ERROR_CODE.INTERNAL_SERVER_ERROR(RENTAL_TYPE_ERROR));
    }

    const timeCostInfos = rentalType.timeCostInfos;

    const realCost = timeCostInfos.reduce<number>((acc, next) => {
      if (this.startAt <= next.time && next.time <= this.endAt) {
        acc += next.cost;
      }
      return acc;
    }, 0);

    if (realCost !== this.originalCost) {
      throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
    }
  }

  public validatePackageReservation(rentalType: RentalTypeDTO) {
    if (rentalType.startAt !== this.startAt || rentalType.endAt !== this.endAt) {
      throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_TIME_BAD_REQUEST));
    }

    if (rentalType.baseCost !== this.originalCost) {
      throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
    }
  }
}
