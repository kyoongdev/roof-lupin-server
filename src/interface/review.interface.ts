import type {
  Host,
  Image,
  PublicTransportation,
  RentalType,
  Space,
  SpaceInterest,
  SpaceLocation,
  SpaceReview,
  SpaceReviewAnswer,
  SpaceReviewImage,
  UserReport,
} from '@prisma/client';

import { CommonUser } from './user.interface';

export interface CommonReviewSpace extends Space {
  publicTransportations: PublicTransportation[];
  userInterests: SpaceInterest[];
  rentalType: RentalType[];
  reviews: SpaceReview[];
  location: SpaceLocation;
  reports: UserReport[];
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
}
