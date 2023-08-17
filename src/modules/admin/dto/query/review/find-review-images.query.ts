import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

export class AdminFindReviewImagesQuery extends PagingDTO {
  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '베스트 이미지 여부' } })
  isBest?: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 id' } })
  spaceId?: string;

  generateQuery(): Prisma.SpaceReviewImageFindManyArgs {
    return {
      where: {
        ...(typeof this.isBest === 'boolean' && {
          isBest: this.isBest,
        }),
        ...(this.spaceId && {
          spaceId: this.spaceId,
        }),
      },
    };
  }
}
