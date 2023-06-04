import { Property } from 'wemacu-nestjs';

interface AppInfoDTOProps {
  iosVersion: string;
  androidVersion: string;
}

export class AppInfoDTO {
  @Property({ apiProperty: { type: 'string' } })
  iosVersion: string;

  @Property({ apiProperty: { type: 'string' } })
  androidVersion: string;

  constructor(props: AppInfoDTOProps) {
    this.iosVersion = props.iosVersion;
    this.androidVersion = props.androidVersion;
  }
}
