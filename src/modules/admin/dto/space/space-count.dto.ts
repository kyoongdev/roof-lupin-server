import { Property } from 'cumuco-nestjs';

export interface SpaceCountDTOProps {
  count: number;
}

export class SpaceCountDTO {
  @Property({ apiProperty: { type: 'number', description: '공간 개수' } })
  count: number;

  constructor(props: SpaceCountDTOProps) {
    this.count = props.count;
  }
}
