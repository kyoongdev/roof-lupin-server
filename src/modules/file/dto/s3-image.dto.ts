import { Property } from 'cumuco-nestjs';

export interface S3ImageDTOProps {
  key: string;
  url: string;
  inUse?: boolean;
}

export class S3ImageDTO {
  @Property({ apiProperty: { type: 'string' } })
  key: string;

  @Property({ apiProperty: { type: 'string' } })
  url: string;

  @Property({ apiProperty: { type: 'boolean' } })
  inUse?: boolean;

  constructor(props: S3ImageDTOProps) {
    this.key = props.key;
    this.url = props.url;
    this.inUse = props.inUse;
  }
}
