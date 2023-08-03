import { Prisma } from '@prisma/client';

import { SpaceDTO } from '@/modules/space/dto';

export const reservationInclude: Prisma.ReservationInclude = {
  user: true,
  rentalTypes: {
    include: {
      rentalType: {
        include: {
          timeCostInfo: true,
          space: {
            include: SpaceDTO.getSpacesIncludeOption(),
          },
          additionalServices: true,
        },
      },
    },
  },
  spaceReviews: true,
};
