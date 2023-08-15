import { Prisma } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { DAY_ENUM, DayReqDecorator } from '@/utils';

export class FindSpaceRentalTypeQuery {
  @DayReqDecorator(true)
  day?: DAY_ENUM;

  generateQuery(): Prisma.RentalTypeFindManyArgs {
    return {
      where: {
        ...(this.day && {
          day: this.day,
        }),
      },
    };
  }
}
