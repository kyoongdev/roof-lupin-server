import { Property } from 'wemacu-nestjs';

interface UpdateAppInfoDTOProps {
  iosVersion?: string;
  androidVersion?: string;
}

export class UpdateAppInfoDTO {
  @Property({ apiProperty: { type: 'string', nullable: true } })
  iosVersion?: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  androidVersion?: string;

  constructor(props?: UpdateAppInfoDTOProps) {
    if (props) {
      this.iosVersion = props.iosVersion;
      this.androidVersion = props.androidVersion;
    }
  }
}
