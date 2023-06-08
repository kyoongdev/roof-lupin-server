import type { PublicTransportation, RentalType, Space, SpaceLocation } from '@prisma/client';

export type CommonReservation = RentalType & {
  space: Space & {
    _count: {
      reviews: number;
    };
    location: SpaceLocation;
    publicTransportations: PublicTransportation[];
  };
};
