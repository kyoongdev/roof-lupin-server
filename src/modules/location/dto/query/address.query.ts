import { PagingDTO, Property } from 'cumuco-nestjs';

export class AddressQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', description: '검색어' } })
  keyword: string;
}
