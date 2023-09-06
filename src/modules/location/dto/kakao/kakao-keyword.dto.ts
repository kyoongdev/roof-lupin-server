import { Property } from 'cumuco-nestjs';

import { KakaoLocationDTO } from './kakao-location.dto';
import { KakaoMetaDTO } from './kakao-meta.dto';

export class KakaoKeywordDTO {
  @Property({ apiProperty: { type: KakaoLocationDTO, isArray: true, description: '장소' } })
  data: KakaoLocationDTO[];

  @Property({ apiProperty: { type: KakaoMetaDTO, description: '개수' } })
  count: KakaoMetaDTO;
}
