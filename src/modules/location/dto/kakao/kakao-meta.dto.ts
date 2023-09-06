import { Property } from 'cumuco-nestjs';

import { KakaoSameNameDTO } from './kakao-same-name.dto';

export class KakaoMetaDTO {
  @Property({ apiProperty: { type: KakaoSameNameDTO } })
  same_name: KakaoSameNameDTO;

  @Property({ apiProperty: { type: 'number' } })
  pageable_count: number;

  @Property({ apiProperty: { type: 'number' } })
  total_count: number;

  @Property({ apiProperty: { type: 'boolean' } })
  is_end: boolean;
}
