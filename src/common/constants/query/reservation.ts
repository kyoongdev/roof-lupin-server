import { Prisma } from '@prisma/client';

export const reservationInclude: Prisma.ReservationInclude = {
  user: true,
  rentalTypes: {
    include: {
      rentalType: {
        include: {
          timeCostInfo: true,
          space: {
            include: {
              reviews: true,
              location: true,
              publicTransportations: true,
              userInterests: true,
              rentalType: true,
            },
          },
        },
      },
    },
  },
  spaceReviews: true,
};
