import type {
  AdditionalService,
  Host,
  RentalType,
  Reservation,
  ReservationRentalType,
  SpaceReview,
  TimeCostInfo,
  User,
  UserSetting,
  UserSocial,
} from '@prisma/client';

import { CommonSpace } from './space.interface';

export interface CommonReservation extends Reservation {
  user: User & {
    socials: UserSocial[];
    setting: UserSetting;
  };
  rentalTypes: CommonReservationRentalType[];
  spaceReviews: SpaceReview[];
  cancel?: CommonReservationCancel;
  refund?: CommonReservationRefund;
  additionalServices: CommonReservationAdditionalService[];
}

export interface CommonReservationAdditionalService {
  count: number;
  additionalService: AdditionalService;
}

export interface CommonReservationRefund {
  id: string;
  reason: string;
  refundCost: number;
}
export interface CommonReservationCancel {
  id: string;
  reason: string;
  user?: User & {
    socials: UserSocial[];
    setting: UserSetting;
  };
  host?: Host;
  createdAt: Date;
}

export interface CommonRentalType extends RentalType {
  timeCostInfos: TimeCostInfo[];
  additionalServices: AdditionalService[];
  space: CommonSpace;
}

export interface CommonReservationRentalType extends ReservationRentalType {
  rentalType: CommonRentalType;
}

export interface CommonReservationWithRentalType extends ReservationRentalType {
  reservation: CommonReservation;
}

export const RESERVATION_STATUS = {
  APPROVED_PENDING: 'APPROVED_PENDING',
  APPROVED: 'APPROVED',
  USED: 'USED',
  CANCELED: 'CANCELED',
  REFUND: 'REFUND',
  BEFORE_USAGE: 'BEFORE_USAGE',
} as const;

export type ReservationStatus = keyof typeof RESERVATION_STATUS;
