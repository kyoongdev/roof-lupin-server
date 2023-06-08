import { Property } from 'wemacu-nestjs';

import { RentalTypeDTO } from '@/modules/space/dto/rentalType';
import { RENTAL_TYPE_ERROR, SPACE_ERROR_CODE } from '@/modules/space/exception/errorCode';
import { SpaceException } from '@/modules/space/exception/space.exception';
import { GenderValidation } from '@/utils/validation';

import {
  RESERVATION_COST_BAD_REQUEST,
  RESERVATION_ERROR_CODE,
  RESERVATION_TIME_BAD_REQUEST,
} from '../exception/errorCode';
import { ReservationException } from '../exception/reservation.exception';

import { ReservationDTO } from './reservation.dto';
import { TimeValidation } from './validation';

export interface CreateReservationDTOProps {
  year: string;
  month: string;
  day: string;
  startAt: number;
  endAt: number;
  cost: number;
  rentalTypeId: string;
  spaceId: string;
}

export class CreateReservationDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '예약 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '예약 일' } })
  day: string;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '예약 시작 시간 (0 ~ 23)' } })
  startAt: number;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', description: '예약 종료 시간 (0 ~ 23)' } })
  endAt: number;

  @Property({ apiProperty: { type: 'number', description: '예약 비용' } })
  cost: number;

  @Property({ apiProperty: { type: 'string', description: '대여 타입 아이디' } })
  rentalTypeId: string;

  @Property({ apiProperty: { type: 'string', description: '공간 아이디' } })
  spaceId: string;

  constructor(props?: CreateReservationDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.cost = props.cost;
      this.rentalTypeId = props.rentalTypeId;
      this.spaceId = props.spaceId;
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
    //INFO: 대여 정보가 올바르지 않을 경우
    if (!rentalType.timeCostInfos) {
      throw new SpaceException(SPACE_ERROR_CODE.INTERNAL_SERVER_ERROR(RENTAL_TYPE_ERROR));
    }

    const timeCostInfos = rentalType.timeCostInfos;

    const realCost = timeCostInfos.reduce<number>((acc, next) => {
      if (17 <= next.startAt || next.endAt <= 20) {
        acc += next.cost;
      }
      return acc;
    }, 0);

    if (realCost !== this.cost) {
      throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_COST_BAD_REQUEST));
    }
  }

  public validatePackageReservation(rentalType: RentalTypeDTO) {
    if (rentalType.startAt !== this.startAt || rentalType.endAt !== this.endAt) {
      throw new ReservationException(RESERVATION_ERROR_CODE.BAD_REQUEST(RESERVATION_TIME_BAD_REQUEST));
    }
  }
}
