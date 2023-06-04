import { Property } from 'wemacu-nestjs';

interface CreateAppInfoDTOProps {
  iosVersion: string;
  androidVersion: string;
}

export class CreateAppInfoDTO {
  @Property({ apiProperty: { type: 'string' } })
  iosVersion: string;

  @Property({ apiProperty: { type: 'string' } })
  androidVersion: string;

  constructor(props?: CreateAppInfoDTOProps) {
    if (props) {
      this.iosVersion = props.iosVersion;
      this.androidVersion = props.androidVersion;
    }
  }
}
