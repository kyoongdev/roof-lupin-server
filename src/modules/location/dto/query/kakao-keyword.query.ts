import { PagingDTO, Property } from 'cumuco-nestjs';

export class KakaoKeywordQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', description: '키워드' } })
  keyword: string;
}
