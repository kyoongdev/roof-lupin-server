import { Prisma } from '@prisma/client';
import { PagingDTO, Property, ToBoolean } from 'cumuco-nestjs';

import {
  ADMIN_SPACE_SORT_OPTION,
  ADMIN_SPACE_SORT_OPTION_VALUES,
  AdminSpaceSortValidation,
} from '../../validation/space-sort.validation';

export class AdminFindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '공간 이름' } })
  title?: string;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '공간 승인 여부' } })
  isApproved?: boolean;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '공간 노출 여부' } })
  isPublic?: boolean;

  @AdminSpaceSortValidation()
  @Property({ apiProperty: { type: 'string', nullable: true, enum: ADMIN_SPACE_SORT_OPTION_VALUES } })
  sort?: keyof typeof ADMIN_SPACE_SORT_OPTION;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '호스트 id' } })
  hostId?: string;
}
