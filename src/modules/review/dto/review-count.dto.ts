import { Property } from 'cumuco-nestjs';

export interface ReviewCountDTOProps {
  count: number;
}

export class ReviewCountDTO {
  @Property({ apiProperty: { type: 'number', description: '리뷰 갯수' } })
  count: number;

  constructor(props: ReviewCountDTOProps) {
    this.count = props.count;
  }
}
