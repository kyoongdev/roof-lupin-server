import { Prisma } from '@prisma/client';

export const reservationInclude: Prisma.ReservationInclude = {
  user: {
    include: {
      socials: true,
      setting: true,
    },
  },
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
                      icons: {
                        include: {
                          icon: true,
                        },
                      },
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
