import { Prisma } from '@prisma/client';
import { PagingDTO } from 'cumuco-nestjs';

import { ReportStatusReqDecorator } from '../validation';

export class FindReportsQuery extends PagingDTO {
  @ReportStatusReqDecorator(true)
  reportStatus?: number;

  generateQuery(): Prisma.UserReportFindManyArgs {
    return {
      where: {
        ...(this.reportStatus && { reportStatus: this.reportStatus }),
      },
    };
  }
}
