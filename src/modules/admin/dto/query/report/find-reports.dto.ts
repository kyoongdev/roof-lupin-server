import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class AdminFindReportsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 id' } })
  userId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '유저 이름' } })
  userName?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 이름' } })
  spaceName?: string;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '답변 여부' } })
  isAnswered?: boolean;

  generateQuery(): Prisma.SpaceReportFindManyArgs {
    return {
      where: {
        ...(this.userId && {
          userId: this.userId,
        }),
        ...(this.userName && {
          user: {
            name: {
              contains: this.userName,
            },
          },
        }),
        ...(this.spaceName && {
          space: {
            title: {
              contains: this.spaceName,
            },
          },
        }),
        ...(typeof this.isAnswered === 'boolean' && {
          answer: this.isAnswered ? { NOT: null } : null,
        }),
      },
    };
  }
}
