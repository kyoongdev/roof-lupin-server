import { Property } from 'cumuco-nestjs';

export interface PushTokenDTOProps {
  pushToken?: string;
}

export class PushTokenDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '푸시 토큰' } })
  pushToken: string | null;

  constructor(props: PushTokenDTOProps) {
    this.pushToken = props.pushToken ?? null;
  }
}
