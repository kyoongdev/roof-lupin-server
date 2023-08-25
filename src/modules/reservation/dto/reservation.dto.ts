import { Prisma } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { CheckIsTargetDay } from '@/interface/common.interface';
import type { CommonReservation, ReservationStatus } from '@/interface/reservation.interface';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { BaseReservationDTO, BaseReservationDTOProps } from './base-reservation.dto';
import { ReservationCancelDTO, ReservationCancelDTOProps } from './cancel';
import { RefundDTO, RefundDTOProps } from './refund/refund.dto';
import { ReservationRentalTypeDTO, ReservationRentalTypeDTOProps } from './reservation-rental-type.dto';

export interface ReservationDTOProps extends BaseReservationDTOProps {
  user: CommonUserProps;
  rentalTypes: ReservationRentalTypeDTOProps[];
  space: SpaceDTOProps;
  isReviewed: boolean;
  cancel?: ReservationCancelDTOProps;
  refund?: RefundDTOProps;
}

export class ReservationDTO extends BaseReservationDTO {
  @Property({ apiProperty: { type: CommonUserDTO, description: '유저 정보' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: ReservationRentalTypeDTO, isArray: true, description: '대여 정보' } })
  rentalTypes: ReservationRentalTypeDTO[];

  @Property({ apiProperty: { type: SpaceDTO, description: '공간 정보' } })
  space: SpaceDTO;

  @Property({ apiProperty: { type: 'boolean', description: '리뷰 작성 여부' } })
  isReviewed: boolean;

  @Property({
    apiProperty: {
      type: 'string',
      description: '예약 상태',
      example: 'APPROVED_PENDING | APPROVED | USED | USER_CANCELED | HOST_CANCELED | REFUND',
    },
  })
  status: ReservationStatus;

  @Property({ apiProperty: { type: RefundDTO, description: '환불 정보' } })
  refund?: RefundDTO;

  @Property({ apiProperty: { type: ReservationCancelDTO, nullable: true, description: '취소 정보' } })
  cancel?: ReservationCancelDTO;

  constructor(props: ReservationDTOProps) {
    super(props);
    this.isReviewed = props.isReviewed;
    this.user = new CommonUserDTO(props.user);
    this.rentalTypes = props.rentalTypes.map((rentalType) => new ReservationRentalTypeDTO(rentalType));
    this.space = new SpaceDTO(props.space);
    this.refund = props.refund ? new RefundDTO(props.refund) : null;
    this.cancel = props.cancel ? new ReservationCancelDTO(props.cancel) : null;
    this.setReservationStatus();
  }

  setReservationStatus() {
    const currentDateTime = new Date();
    const startAt = Math.min(...this.rentalTypes.map((rentalType) => rentalType.startAt));
    if (
      Number(this.year) <= currentDateTime.getFullYear() &&
      Number(this.month) <= currentDateTime.getMonth() &&
      Number(this.day) <= currentDateTime.getDate() &&
      startAt <= currentDateTime.getHours()
    ) {
      this.status = 'USED';
    } else if (this.space.isImmediateReservation && !this.isApproved) {
      this.status = 'APPROVED_PENDING';
    } else if (this.space.isImmediateReservation && this.isApproved && !this.payedAt) {
      this.status = 'APPROVED';
    } else if (this.cancel) {
      if (this.cancel.user) {
        this.status = 'USER_CANCELED';
      } else if (this.cancel.host) {
        this.status = 'HOST_CANCELED';
      }
    } else if (this.refund) {
      this.status = 'REFUND';
    } else {
      this.status = 'BEFORE_USAGE';
    }
  }

  static generateReservationDTO(reservation: CommonReservation): ReservationDTOProps {
    const { rentalTypes, ...rest } = reservation;
    const { space } = rentalTypes[0].rentalType;

    return {
      ...rest,
      year: `${rest.year}`,
      month: `${rest.month}`,
      day: `${rest.day}`,
      user: rest.user,
      rentalTypes: rentalTypes.map((rentalType) => rentalType),
      space: SpaceDTO.generateSpaceDTO(space),
      isReviewed: reservation.spaceReviews ? reservation.spaceReviews.length > 0 : false,
      refund: reservation.refund ? reservation.refund : undefined,
    };
  }

  static generateReservationInclude(userId?: string) {
    return {
      user: true,
      cancel: {
        include: {
          user: true,
          host: true,
        },
      },
      refunds: true,
      rentalTypes: {
        include: {
          rentalType: {
            include: {
              timeCostInfos: true,
              space: {
                include: {
                  location: true,
                  reviews: true,
                  publicTransportations: true,
                  userInterests: true,
                  rentalType: true,
                  categories: {
                    include: {
                      category: {
                        include: {
                          icon: true,
                        },
                      },
                    },
                  },
                  reports: true,
                },
              },
              additionalServices: true,
            },
          },
        },
      },
      spaceReviews: userId
        ? {
            where: {
              userId,
            },
          }
        : true,
    };
  }

  checkIsTargetDay(targetDate: CheckIsTargetDay) {
    return targetDate.year === this.year && targetDate.month === this.month && targetDate.day === this.day;
  }
}
