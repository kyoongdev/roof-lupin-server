import { Property } from 'cumuco-nestjs';

import { CommonReservation } from '@/interface/reservation.interface';
import { SpaceDTO } from '@/modules/space/dto';

import { ReservationDTO, type ReservationDTOProps } from './reservation.dto';

export interface ReservationDetailDTOProps extends ReservationDTOProps {
  orderId?: string;
  orderResultId?: string;
  payMethod?: number;
  refundCost?: number;
  isApproved: boolean;
  approvedAt?: Date;
}

export class ReservationDetailDTO extends ReservationDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '주문번호' } })
  orderId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '주문결과번호' } })
  orderResultId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '결제방식' } })
  payMethod?: number;

  @Property({ apiProperty: { type: 'number', nullable: true, description: '환불 금액' } })
  refundCost?: number;

  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isApproved: boolean;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '승인일' } })
  approvedAt?: Date;

  constructor(props: ReservationDetailDTOProps) {
    super(props);
    this.orderId = props.orderId;
    this.orderResultId = props.orderResultId;
    this.payMethod = props.payMethod;
    this.refundCost = props.refundCost;
    this.isApproved = props.isApproved;
    this.approvedAt = props.approvedAt;
  }

  static generateReservationDetailDTO(reservation: CommonReservation): ReservationDetailDTOProps {
    const { rentalTypes, ...rest } = reservation;
    const { space } = rentalTypes[0].rentalType;

    return {
      ...rest,
      year: String(rest.year),
      month: String(rest.month),
      day: String(rest.day),
      rentalTypes: rentalTypes.map((rentalType) => rentalType),
      space: SpaceDTO.generateSpaceDTO(space),
      isReviewed: rest.spaceReviews.length > 0,
    };
  }
}
