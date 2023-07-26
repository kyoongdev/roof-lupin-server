import { Prisma } from '@prisma/client';
import { PagingDTO, Property } from 'cumuco-nestjs';

export class FindUsersQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '닉네임' } })
  nickname?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '이메일' } })
  email?: string;

  generateQuery(): Prisma.UserFindManyArgs {
    return {
      where: {
        ...(this.nickname && {
          nickname: {
            contains: this.nickname,
          },
        }),
        ...(this.email && {
          email: {
            contains: this.email,
          },
        }),
      },
    };
  }
}
