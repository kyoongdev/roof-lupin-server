import { Property } from 'cumuco-nestjs';

import { getDateDiff } from '@/common/date';
import { CommonReservation } from '@/interface/reservation.interface';
import { SpaceDTO } from '@/modules/space/dto';

import { ReservationDTO, type ReservationDTOProps } from './reservation.dto';

export interface ReservationDetailDTOProps extends ReservationDTOProps {
  orderId?: string;
  orderResultId?: string;
  approvedAt?: Date;
  settlementId: string;
}

export class ReservationDetailDTO extends ReservationDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '주문번호' } })
  orderId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '주문결과번호' } })
  orderResultId?: string;

  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isApproved: boolean;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '승인일' } })
  approvedAt?: Date;

  @Property({ apiProperty: { type: 'string', description: '정산 아이디' } })
  settlementId: string;

  constructor(props: ReservationDetailDTOProps) {
    super(props);
    this.orderId = props.orderId;
    this.orderResultId = props.orderResultId;
    this.isApproved = props.isApproved;
    this.approvedAt = props.approvedAt;
    this.settlementId = props.settlementId;
  }

  static generateReservationDetailDTO(reservation: CommonReservation): ReservationDetailDTOProps {
    const { rentalTypes, ...rest } = reservation;
    const { space } = rentalTypes[0].rentalType;
    const currentDate = new Date();
    const reservationDate = new Date(
      Number(reservation.year),
      Number(reservation.month) - 1,
      Number(reservation.day),
      9
    );
    const maxStartAt = Math.max(...rentalTypes.map((rentalType) => rentalType.startAt));

    if (maxStartAt > 24) {
      reservationDate.setDate(reservationDate.getDate() + 1);
    }

    return {
      ...rest,
      year: rest.year,
      month: rest.month,
      day: rest.day,
      rentalTypes: rentalTypes.map((rentalType) => rentalType),
      space: SpaceDTO.generateSpaceDTO(space),
      isReviewed: rest.spaceReviews.length > 0,
      isReviewable:
        !reservation.cancel &&
        reservation.spaceReviews.length === 0 &&
        currentDate > reservationDate &&
        getDateDiff(reservationDate, currentDate) <= 14,
      additionalServices: reservation.additionalServices.map(({ count, additionalService }) => ({
        ...additionalService,
        count,
      })),
    };
  }
}
