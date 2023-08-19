import { Prisma } from '@prisma/client';

export const reservationInclude: Prisma.ReservationInclude = {
  user: true,
  rentalTypes: {
    include: {
      rentalType: {
        include: {
          timeCostInfos: true,
          space: {
            include: {
              location: true,
              reviews: true,
              publicTransportations: true,
              userInterests: true,
              rentalType: true,
              categories: {
                include: {
                  category: {
                    include: {
                      icon: true,
                    },
                  },
                },
              },
              reports: true,
            },
          },
          additionalServices: true,
        },
      },
    },
  },
  spaceReviews: true,
};
