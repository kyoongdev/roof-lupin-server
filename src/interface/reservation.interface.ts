import type {
  AdditionalService,
  Host,
  RentalType,
  Reservation,
  ReservationRentalType,
  SpaceReview,
  TimeCostInfo,
  User,
} from '@prisma/client';

import { CommonSpace } from './space.interface';

export interface CommonReservation extends Reservation {
  user: User;
  rentalTypes: CommonReservationRentalType[];
  spaceReviews: SpaceReview[];
  cancel?: CommonReservationCancel;
  refund?: CommonReservationRefund;
}

export interface CommonReservationRefund {
  id: string;
  reason: string;
  refundCost: number;
}
export interface CommonReservationCancel {
  id: string;
  reason: string;
  user?: User;
  host?: Host;
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

export type ReservationStatus =
  | 'APPROVED_PENDING'
  | 'APPROVED'
  | 'USED'
  | 'USER_CANCELED'
  | 'HOST_CANCELED'
  | 'REFUND'
  | 'BEFORE_USAGE';
