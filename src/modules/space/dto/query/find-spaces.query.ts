import { PagingDTO, Property } from 'wemacu-nestjs';

export class FindSpacesQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '인원수 필터' } })
  userCount?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '카테고리 명' } })
  category?: string;
}
