import { Property } from 'cumuco-nestjs';

interface AppInfoDTOProps {
  id: string;
  iosVersion: string;
  androidVersion: string;
}

export class AppInfoDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  iosVersion: string;

  @Property({ apiProperty: { type: 'string' } })
  androidVersion: string;

  constructor(props: AppInfoDTOProps) {
    this.iosVersion = props.iosVersion;
    this.androidVersion = props.androidVersion;
  }
}
