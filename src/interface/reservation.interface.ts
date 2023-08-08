import type {
  AdditionalService,
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
