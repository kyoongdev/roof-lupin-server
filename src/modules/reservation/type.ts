import type { PublicTransportation, RentalType, Space, SpaceLocation, SpaceReview } from '@prisma/client';

export type CommonReservation = RentalType & {
  space: Space & {
    reviews: SpaceReview[];
    location: SpaceLocation;
    publicTransportations: PublicTransportation[];
    rentalType: RentalType[];
  };
};
