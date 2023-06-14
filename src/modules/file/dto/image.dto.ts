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
}
