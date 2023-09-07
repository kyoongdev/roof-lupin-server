import { Property } from 'cumuco-nestjs';

import { getDateDiff } from '@/common/date';
import { CheckIsTargetDay } from '@/interface/common.interface';
import { type CommonReservation, RESERVATION_STATUS, type ReservationStatus } from '@/interface/reservation.interface';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { ReservationAdditionalServiceDTO, ReservationAdditionalServiceDTOProps } from './additional-service';
import { BaseReservationDTO, BaseReservationDTOProps } from './base-reservation.dto';
import { ReservationCancelDTO, ReservationCancelDTOProps } from './cancel';
import { ReservationRentalTypeDTO, ReservationRentalTypeDTOProps } from './reservation-rental-type.dto';

export interface ReservationDTOProps extends BaseReservationDTOProps {
  user: CommonUserProps;
  rentalTypes: ReservationRentalTypeDTOProps[];
  space: SpaceDTOProps;
  isReviewed: boolean;
  isReviewable: boolean;
  cancel?: ReservationCancelDTOProps;
  additionalServices: ReservationAdditionalServiceDTOProps[];
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

  @Property({ apiProperty: { type: 'boolean', description: '리뷰 작성 가능 여부' } })
  isReviewable: boolean;

  @Property({
    apiProperty: {
      type: 'string',
      description: '예약 상태',
      example: Object.keys(RESERVATION_STATUS).join(' | '),
    },
  })
  status: ReservationStatus;

  @Property({ apiProperty: { type: ReservationCancelDTO, nullable: true, description: '취소 정보' } })
  cancel?: ReservationCancelDTO;

  @Property({ apiProperty: { type: ReservationAdditionalServiceDTO, isArray: true, description: '부가 서비스 정보' } })
  additionalServices: ReservationAdditionalServiceDTO[];

  constructor(props: ReservationDTOProps) {
    super(props);
    this.isReviewed = props.isReviewed;
    this.isReviewable = props.isReviewable;
    this.user = new CommonUserDTO(props.user);
    this.rentalTypes = props.rentalTypes.map((rentalType) => new ReservationRentalTypeDTO(rentalType));
    this.space = new SpaceDTO(props.space);
    this.cancel = props.cancel ? new ReservationCancelDTO(props.cancel) : null;
    this.additionalServices = props.additionalServices
      ? props.additionalServices.map((additionalService) => new ReservationAdditionalServiceDTO(additionalService))
      : null;
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
      this.status = RESERVATION_STATUS.USED;
    } else if (this.space.isImmediateReservation && !this.isApproved) {
      this.status = RESERVATION_STATUS.APPROVED_PENDING;
    } else if (this.space.isImmediateReservation && this.isApproved && !this.payedAt) {
      this.status = RESERVATION_STATUS.APPROVED;
    } else if (this.cancel) {
      if (this.cancel.refundCost) {
        this.status = RESERVATION_STATUS.REFUND;
      } else if (this.cancel.host) {
        this.status = RESERVATION_STATUS.HOST_CANCELED;
      }
    } else {
      this.status = RESERVATION_STATUS.BEFORE_USAGE;
    }
  }

  static generateReservationDTO(reservation: CommonReservation): ReservationDTOProps {
    const { rentalTypes, ...rest } = reservation;
    const { space } = rentalTypes[0].rentalType;
    const currentDate = new Date();
    const reservationDate = new Date(
      Number(reservation.year),
      Number(reservation.month) - 1,
      Number(reservation.day),
      9
    );

    return {
      ...rest,
      year: rest.year,
      month: rest.month,
      day: rest.day,
      user: rest.user,
      rentalTypes: rentalTypes.map((rentalType) => rentalType),
      space: SpaceDTO.generateSpaceDTO(space),
      isReviewed: reservation.spaceReviews ? reservation.spaceReviews.length > 0 : false,
      isReviewable:
        reservation.spaceReviews.length === 0 &&
        currentDate > reservationDate &&
        getDateDiff(reservationDate, currentDate) <= 14,
      additionalServices: reservation.additionalServices.map(({ count, additionalService }) => ({
        ...additionalService,
        count,
      })),
    };
  }

  static generateReservationInclude(userId?: string) {
    return {
      user: {
        include: {
          socials: true,
          setting: true,
        },
      },
      cancel: {
        include: {
          user: {
            include: {
              socials: true,
              setting: true,
            },
          },
          host: true,
        },
      },
      additionalServices: {
        include: {
          additionalService: true,
        },
      },
      rentalTypes: {
        include: {
          rentalType: {
            include: {
              timeCostInfos: true,
              space: {
                include: SpaceDTO.getSpacesIncludeOption(),
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
    return (
      Number(targetDate.year) === this.year &&
      Number(targetDate.month) === this.month &&
      Number(targetDate.day) === this.day
    );
  }
}
