import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

import { REPORT_TYPE, ReportTypeReqDecorator } from '@/modules/report/dto/validation';

export class AdminFindReportsQuery extends PagingDTO {
  @ReportTypeReqDecorator(true)
  type?: keyof typeof REPORT_TYPE;

  generateQuery(): Prisma.UserReportFindManyArgs {
    return {
      where: {
        ...(this.type && {
          ...(this.type === 'QNA' && {
            spaceQnA: {
              isNot: null,
            },
          }),
          ...(this.type === 'REVIEW' && {
            spaceReview: {
              isNot: null,
            },
          }),
          ...(this.type === 'SPACE' && {
            space: {
              isNot: null,
            },
          }),
        }),
      },
    };
  }
}
