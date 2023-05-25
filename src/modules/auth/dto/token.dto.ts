import { Property } from 'wemacu-nestjs';

interface Props {
  accessToken: string;
  refreshToken: string;
}

export class TokenDTO {
  @Property({ apiProperty: { type: 'string' } })
  accessToken: string;

  @Property({ apiProperty: { type: 'string' } })
  refreshToken: string;

  constructor(props?: Props) {
    if (props) {
      this.accessToken = props.accessToken;
      this.refreshToken = props.refreshToken;
    }
  }
}
