import { ConfigService } from '@nestjs/config';

import { Property } from 'wemacu-nestjs';

export interface Props {
  url: string;
}

export class ImageDTO {
  @Property({ apiProperty: { type: 'string' } })
  url: string;

  constructor(props: Props) {
    this.url = props.url;
  }

  static parseS3ImageKey(url: string) {
    const configService = new ConfigService();
    const key = url.split(`${configService.get('AWS_CLOUD_FRONT_URL')}`).at(-1);

    return `${configService.get('NODE_ENV')}${key}`;
  }
}
