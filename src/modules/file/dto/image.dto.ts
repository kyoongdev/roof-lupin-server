import { Property } from 'wemacu-nestjs';

export interface Props {
  id: string;
  url: string;
}

export class ImageDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  url: string;

  constructor(props: Props) {
    this.id = props.id;
    this.url = props.url;
  }
}
