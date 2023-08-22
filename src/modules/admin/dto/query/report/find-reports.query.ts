import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

import { REPORT_TYPE, ReportTypeReqDecorator } from '@/modules/report/dto/validation';

export class AdminFindReportsQuery extends PagingDTO {
  @ReportTypeReqDecorator(true)
  type?: keyof typeof REPORT_TYPE;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '신고 처리 여부' } })
  isAnswered?: boolean;

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
        ...(typeof this.isAnswered === 'boolean' && {
          answer: {
            ...(this.isAnswered
              ? {
                  some: {
                    deletedAt: null,
                  },
                }
              : {
                  none: {
                    deletedAt: null,
                  },
                }),
          },
        }),
      },
    };
  }
}
