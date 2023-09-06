import { Property } from 'cumuco-nestjs';

export class KakaoSameNameDTO {
  @Property({ apiProperty: { type: 'string', isArray: true } })
  region: string[];

  @Property({ apiProperty: { type: 'string' } })
  keyword: string;

  @Property({ apiProperty: { type: 'string' } })
  selected_region: string;
}
