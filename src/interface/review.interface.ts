import type {
  AdditionalService,
  Host,
  Image,
  PublicTransportation,
  RentalType,
  Reservation,
  ReservationRentalType,
  Space,
  SpaceInterest,
  SpaceLocation,
  SpaceReview,
  SpaceReviewAnswer,
  SpaceReviewImage,
  TimeCostInfo,
  UserReport,
} from '@prisma/client';

import type { CommonUser } from './user.interface';

export interface CommonReviewSpace extends Space {
  publicTransportations: PublicTransportation[];
  userInterests: SpaceInterest[];
  rentalType: RentalType[];
  reviews: SpaceReview[];
  location: SpaceLocation;
  reports: UserReport[];
}

export interface CommonReviewRentalType extends RentalType {
  timeCostInfos: TimeCostInfo[];
  additionalServices: AdditionalService[];
}

export interface CommonReviewReservationRentalType extends ReservationRentalType {
  rentalType: CommonReviewRentalType;
}
export interface CommonReviewReservation extends Reservation {
  rentalTypes: CommonReviewReservationRentalType[];
}

export interface CommonReviewAnswer extends SpaceReviewAnswer {
  host: Host;
}

export interface CommonReviewImage extends SpaceReviewImage {
  image: Image;
}

export interface CommonReview extends SpaceReview {
  user: CommonUser;
  answers: CommonReviewAnswer[];
  images: CommonReviewImage[];
  space: CommonReviewSpace;
  reservation: CommonReviewReservation;
}
