import { Property } from 'wemacu-nestjs';

export class KakaoSocialUserQuery {
  @Property({ apiProperty: { type: 'string', description: '카카오에서 발급받은 access token' } })
  token: string;
}
