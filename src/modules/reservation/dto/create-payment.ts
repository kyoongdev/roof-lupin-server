import { Property } from 'wemacu-nestjs';

import {
  AdditionalServiceReservationDTO,
  AdditionalServiceReservationDTOProps,
} from '@/modules/space/dto/additionalService';
import { PhoneNumberValidation } from '@/utils/validation';

import {
  CreateReservationRentalTypeDTO,
  CreateReservationRentalTypeDTOProps,
} from './create-reservation-rental-type.dto';

export interface CreatePaymentDTOProps {
  year: string;
  month: string;
  day: string;
  userName: string;
  userPhoneNumber: string;
  totalCost: number;
  userCount: number;
  discountCost: number;
  originalCost: number;
  rentalTypes: CreateReservationRentalTypeDTOProps[];
  spaceId: string;
  userCouponIds?: string[];
  additionalServices?: AdditionalServiceReservationDTOProps[];
  reservationId?: string;
}

export class CreatePaymentDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 연도' } })
  year: string;

  @Property({ apiProperty: { type: 'string', description: '예약 월' } })
  month: string;

  @Property({ apiProperty: { type: 'string', description: '예약 일' } })
  day: string;

  @Property({ apiProperty: { type: 'string', description: '대표 이용자 이름' } })
  userName: string;

  @PhoneNumberValidation()
  @Property({ apiProperty: { type: 'string', description: '대표 이용자 전화번호' } })
  userPhoneNumber: string;

  @Property({ apiProperty: { type: 'number', description: '이용 인원' } })
  userCount: number;

  @Property({ apiProperty: { type: 'number', description: '예약 비용' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인 금액' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인제외 예약 비용' } })
  originalCost: number;

  @Property({ apiProperty: { type: CreateReservationRentalTypeDTO, isArray: true, description: '대여 타입들' } })
  rentalTypes: CreateReservationRentalTypeDTO[];

  @Property({ apiProperty: { type: 'string', description: '공간 아이디' } })
  spaceId: string;

  @Property({
    apiProperty: { type: 'string', isArray: true, nullable: true, description: '유저가 가지고 있는 쿠폰 IDs' },
  })
  userCouponIds?: string[];

  @Property({
    apiProperty: { type: AdditionalServiceReservationDTO, isArray: true, nullable: true, description: '추가 서비스들' },
  })
  additionalServices?: AdditionalServiceReservationDTO[];

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
      this.additionalServices = props.additionalServices?.map(
        (service) => new AdditionalServiceReservationDTO(service)
      );
      this.reservationId = props.reservationId;
    }
  }

  // validateProperties(target: CreatePaymentDTO) {

  // }
}
