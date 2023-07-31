import { Property } from 'cumuco-nestjs';

export interface CurationCountDTOProps {
  count: number;
}

export class CurationCountDTO {
  @Property({ apiProperty: { type: 'number', description: '개수' } })
  count: number;

  constructor(props: CurationCountDTOProps) {
    this.count = props.count;
  }
}
