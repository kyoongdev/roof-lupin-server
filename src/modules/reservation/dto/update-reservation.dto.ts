import { Property } from 'cumuco-nestjs';

import { PhoneNumberValidation } from '@/utils/validation';

import { CreateReservationCancelDTO, CreateReservationCancelDTOProps } from './cancel/create-reservation-cancel.dto';
import { TimeValidation } from './validation';

export interface UpdateReservationDTOProps {
  year?: number;
  month?: number;
  day?: number;
  userName?: string;
  userPhoneNumber?: string;
  startAt?: number;
  endAt?: number;
  totalCost?: number;
  discountCost?: number;
  originalCost?: number;
  isApproved?: boolean;
  isApproveRejected?: boolean;
  cancel?: CreateReservationCancelDTOProps;
}

export class UpdateReservationDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 연도' } })
  year?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 월' } })
  month?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 일' } })
  day?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '대표 이용자 이름' } })
  userName?: string;

  @PhoneNumberValidation()
  @Property({ apiProperty: { type: 'string', nullable: true, description: '대표 이용자 전화번호' } })
  userPhoneNumber?: string;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 시작 시간 (0 ~ 24)' } })
  startAt?: number;

  @TimeValidation()
  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 종료 시간 (0 ~ 24)' } })
  endAt?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '예약 비용' } })
  totalCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인 금액' } })
  discountCost?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '할인제외 예약 비용' } })
  originalCost?: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '승인 여부' } })
  isApproved?: boolean;

  @Property({ apiProperty: { type: CreateReservationCancelDTO, nullable: true, description: '예약 취소 정보' } })
  cancel?: CreateReservationCancelDTO;

  constructor(props?: UpdateReservationDTOProps) {
    if (props) {
      this.year = props.year;
      this.month = props.month;
      this.day = props.day;
      this.userName = props.userName;
      this.userPhoneNumber = props.userPhoneNumber;
      this.startAt = props.startAt;
      this.endAt = props.endAt;
      this.totalCost = props.totalCost;
      this.discountCost = props.discountCost;
      this.originalCost = props.originalCost;
      this.isApproved = props.isApproved;
      this.cancel = props.cancel ? new CreateReservationCancelDTO(props.cancel) : null;
    }
  }
}
