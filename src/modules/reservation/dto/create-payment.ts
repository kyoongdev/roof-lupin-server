import { BadRequestException } from '@nestjs/common';

import { Property } from 'cumuco-nestjs';

import { PeriodsValidation, PhoneNumberValidation } from '@/utils/validation';

import {
  CreateReservationRentalTypeDTO,
  CreateReservationRentalTypeDTOProps,
} from './create-reservation-rental-type.dto';
import { ReservationDetailDTO } from './reservation-detail.dto';

export interface CreatePaymentDTOProps {
  year: number;
  month: number;
  day: number;
  userName: string;
  userPhoneNumber: string;
  totalCost: number;
  userCount: number;
  discountCost: number;
  originalCost: number;
  rentalTypes: CreateReservationRentalTypeDTOProps[];
  spaceId: string;
  userCouponIds?: string[];
  reservationId?: string;
}

export class CreatePaymentDTO {
  @Property({ apiProperty: { type: 'number', maxLength: 4, minLength: 4, description: '예약 연도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '예약 월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', description: '예약 일' } })
  day: number;

  @Property({ apiProperty: { type: 'string', description: '대표 이용자 이름' } })
  userName: string;

  @PhoneNumberValidation()
  @Property({ apiProperty: { type: 'string', description: '대표 이용자 전화번호' } })
  userPhoneNumber: string;

  @Property({ apiProperty: { type: 'number', minimum: 1, description: '이용 인원' } })
  userCount: number;

  @Property({ apiProperty: { type: 'number', description: '예약 비용' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인 금액' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인제외 예약 비용' } })
  originalCost: number;

  @PeriodsValidation()
  @Property({ apiProperty: { type: CreateReservationRentalTypeDTO, isArray: true, description: '대여 타입들' } })
  rentalTypes: CreateReservationRentalTypeDTO[];

  @Property({ apiProperty: { type: 'string', description: '공간 아이디' } })
  spaceId: string;

  @Property({
    apiProperty: { type: 'string', isArray: true, nullable: true, description: '유저가 가지고 있는 쿠폰 IDs' },
  })
  userCouponIds?: string[];

  @Property({
    apiProperty: { type: 'string', nullable: true, description: '승인결제 예약 id' },
  })
  reservationId?: string;

  constructor(props?: CreatePaymentDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.userName = props.userName;
      this.userPhoneNumber = props.userPhoneNumber;
      this.totalCost = props.totalCost;
      this.rentalTypes = props.rentalTypes.map((rentalType) => new CreateReservationRentalTypeDTO(rentalType));
      this.spaceId = props.spaceId;
      this.userCount = props.userCount;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
      this.userCouponIds = props.userCouponIds;

      this.reservationId = props.reservationId;
    }
  }

  //TODO: 예약 승인 신청하고 다시 요청할 때 validate
  validateProperties(target: ReservationDetailDTO) {
    if (
      this.year !== target.year ||
      this.month !== target.month ||
      this.day !== target.day ||
      this.userName !== target.userName ||
      this.userPhoneNumber !== target.userPhoneNumber ||
      this.spaceId !== target.space.id
    ) {
      throw new BadRequestException('예약 정보가 일치하지 않습니다.');
    }
  }
}
