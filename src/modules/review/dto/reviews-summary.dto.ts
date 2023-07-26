import { Property } from 'cumuco-nestjs';

export interface ReviewsSummaryDTOProps {
  averageScore: number;
  count: number;
}

export class ReviewsSummaryDTO {
  @Property({ apiProperty: { type: 'number', description: '평균 점수' } })
  averageScore: number;

  @Property({ apiProperty: { type: 'number', description: '리뷰 개수' } })
  count: number;

  constructor(props: ReviewsSummaryDTOProps) {
    this.averageScore = Number(props.averageScore.toFixed(1));
    this.count = props.count;
  }
}
