import { Property } from 'cumuco-nestjs';

import { DateDTO, DateDTOProps } from '@/common';
import { getDateDiff } from '@/common/date';
import { CheckIsTargetDay } from '@/interface/common.interface';
import { type CommonReservation, RESERVATION_STATUS, type ReservationStatus } from '@/interface/reservation.interface';
import { SpaceDTO, type SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, type CommonUserDTOProps, MeDTO, MeDTOProps } from '@/modules/user/dto';

import { ReservationAdditionalServiceDTO, type ReservationAdditionalServiceDTOProps } from './additional-service';
import { ReservationCancelDTO, type ReservationCancelDTOProps } from './cancel';
import { ReservationRentalTypeDTO, type ReservationRentalTypeDTOProps } from './reservation-rental-type.dto';

export interface ReservationDTOProps extends DateDTOProps {
  id: string;
  year: number;
  month: number;
  day: number;
  code: string;
  userCount: number;
  totalCost: number;
  vatCost: number;
  discountCost: number;
  originalCost: number;
  isApproved: boolean;
  userName: string;
  receiptUrl: string;
  userPhoneNumber: string;
  payedAt?: Date;
  payMethod?: string;
  createdAt: Date;
  updatedAt: Date;
  user: MeDTOProps;
  rentalTypes: ReservationRentalTypeDTOProps[];
  space: SpaceDTOProps;
  isReviewed: boolean;
  isReviewable: boolean;
  cancel?: ReservationCancelDTOProps;
  additionalServices: ReservationAdditionalServiceDTOProps[];
}

export class ReservationDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string', description: '예약 아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '예약 년도' } })
  year: number;

  @Property({ apiProperty: { type: 'number', description: '예약 월' } })
  month: number;

  @Property({ apiProperty: { type: 'number', description: '예약 일' } })
  day: number;

  @Property({ apiProperty: { type: 'string', description: '예약 코드' } })
  code: string;

  @Property({ apiProperty: { type: 'number', description: '결제 금액 (originalCost - discountCost)' } })
  totalCost: number;

  @Property({ apiProperty: { type: 'number', description: '유저 수' } })
  userCount: number;

  @Property({ apiProperty: { type: 'boolean', description: '취소여부' } })
  isCanceled: boolean;

  @Property({ apiProperty: { type: 'string', description: '영수증' } })
  receiptUrl: string;

  @Property({ apiProperty: { type: 'number', description: 'VAT 금액' } })
  vatCost: number;

  @Property({ apiProperty: { type: 'number', description: '할인금액' } })
  discountCost: number;

  @Property({ apiProperty: { type: 'number', description: '총액 - 할인가가 적용되지 않은 금액' } })
  originalCost: number;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '생성 날짜' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '수정 날짜' } })
  updatedAt: Date;

  @Property({
    apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '결제 날짜 - 있으면 예약 확정' },
  })
  payedAt?: Date;

  @Property({
    apiProperty: { type: 'string', enum: ['토스페이', '네이버페이', '카카오페이'], description: '결제 수단' },
  })
  payMethod: string | null;

  @Property({ apiProperty: { type: 'string', description: '유저 이름' } })
  userName: string;

  @Property({ apiProperty: { type: 'string', description: '유저 전화번호' } })
  userPhoneNumber: string;

  @Property({ apiProperty: { type: 'boolean', description: '승인 여부' } })
  isApproved: boolean;

  @Property({ apiProperty: { type: MeDTO, description: '유저 정보' } })
  user: MeDTO;

  @Property({ apiProperty: { type: ReservationRentalTypeDTO, isArray: true, description: '대여 정보' } })
  rentalTypes: ReservationRentalTypeDTO[];

  @Property({ apiProperty: { type: SpaceDTO ?? 'string', description: '공간 정보' } })
  space: SpaceDTO;

  @Property({ apiProperty: { type: 'boolean', description: '리뷰 작성 여부' } })
  isReviewed: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '리뷰 작성 가능 여부' } })
  isReviewable: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '환불 가능 여부' } })
  isRefundable: boolean;

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
    this.id = props.id;
    this.year = props.year;
    this.month = props.month;
    this.day = props.day;
    this.code = props.code;
    this.totalCost = props.totalCost;
    this.vatCost = props.vatCost;
    this.discountCost = props.discountCost;
    this.originalCost = props.originalCost;
    this.receiptUrl = props.receiptUrl;
    this.payedAt = props.payedAt;
    this.userCount = props.userCount;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.userName = props.userName;
    this.userPhoneNumber = props.userPhoneNumber;
    this.isApproved = props.isApproved;
    this.isReviewed = props.isReviewed;
    this.isReviewable = props.isReviewable;
    this.payMethod = props.payMethod ?? null;
    this.user = new MeDTO(props.user);
    this.rentalTypes = props.rentalTypes.map((rentalType) => new ReservationRentalTypeDTO(rentalType));
    this.space = new SpaceDTO(props.space);
    this.cancel = props.cancel ? new ReservationCancelDTO(props.cancel) : null;
    this.additionalServices = props.additionalServices
      ? props.additionalServices.map((additionalService) => new ReservationAdditionalServiceDTO(additionalService))
      : null;
    this.setReservationStatus();
    this.isRefundable = this.checkIsRefundable();
  }

  setReservationStatus() {
    if (this.deletedAt) {
      this.status = RESERVATION_STATUS.CANCELED;
    } else if (this.checkIsUsed()) {
      this.status = RESERVATION_STATUS.USED;
    } else if (this.cancel) {
      if (this.cancel.refundCost) {
        this.status = RESERVATION_STATUS.REFUND;
      } else {
        this.status = RESERVATION_STATUS.CANCELED;
      }
    } else if (!this.space.isImmediateReservation && !this.isApproved) {
      this.status = RESERVATION_STATUS.APPROVED_PENDING;
    } else if (!this.space.isImmediateReservation && this.isApproved && !this.payedAt) {
      this.status = RESERVATION_STATUS.APPROVED;
    } else {
      this.status = RESERVATION_STATUS.BEFORE_USAGE;
    }
  }

  checkIsUsed() {
    const currentDateTime = new Date();
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1;
    const currentDay = currentDateTime.getDate();
    const startAt = Math.min(...this.rentalTypes.map((rentalType) => rentalType.startAt));

    if (this.year < currentYear) {
      return true;
    } else if (this.year === currentYear) {
      if (this.month < currentMonth) {
        return true;
      } else if (this.month === currentMonth) {
        if (this.day < currentDay) {
          return true;
        } else if (this.day === currentDay) {
          if (startAt <= currentDateTime.getHours()) {
            return true;
          }
        }
      }
    }
    return false;
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
    const maxStartAt = Math.max(...rentalTypes.map((rentalType) => rentalType.startAt));

    if (maxStartAt > 24) {
      reservationDate.setDate(reservationDate.getDate() + 1);
    }

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

  checkIsRefundable() {
    const currentDateTime = new Date();
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth() + 1;
    const startAt = Math.min(...this.rentalTypes.map((rentalType) => rentalType.startAt));

    if (this.cancel?.refundCost) {
      return false;
    }

    if (!this.payedAt) {
      return false;
    }

    if (this.checkIsUsed()) {
      return false;
    }

    if (
      currentYear === this.year &&
      currentMonth === this.month &&
      this.day === currentDateTime.getDate() &&
      startAt - currentDateTime.getHours() <= 2
    ) {
      return false;
    }

    return true;
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
                include: SpaceDTO.generateSpaceInclude(),
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
