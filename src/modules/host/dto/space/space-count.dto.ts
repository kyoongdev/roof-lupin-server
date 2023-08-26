import { Property } from 'cumuco-nestjs';

export interface HostSpaceCountDTOProps {
  count: number;
}

export class HostSpaceCountDTO {
  @Property({ apiProperty: { type: 'number', description: '개수' } })
  count: number;

  constructor(props: HostSpaceCountDTOProps) {
    this.count = props.count;
  }
}
