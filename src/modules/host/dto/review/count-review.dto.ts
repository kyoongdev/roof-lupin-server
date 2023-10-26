import { Property } from 'cumuco-nestjs';

export interface HostReviewCountDTOProps {
  count: number;
}

export class HostReviewCountDTO {
  @Property({ apiProperty: { type: 'number', description: '개수' } })
  count: number;

  constructor(props: HostReviewCountDTOProps) {
    this.count = props.count;
  }
}
