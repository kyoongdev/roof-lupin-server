import { Property } from 'cumuco-nestjs';

export class AppleLoginCallbackDTO {
  @Property({ apiProperty: { type: 'string', description: 'id_token' } })
  id_token: string;
}
