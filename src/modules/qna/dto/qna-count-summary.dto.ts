import { Property } from 'cumuco-nestjs';

export interface QnACountSummaryDTOProps {
  notAnsweredCount: number;
  answeredCount: number;
}

export class QnACountSummaryDTO {
  @Property({ apiProperty: { type: 'number', description: '미답변 QnA 개수' } })
  notAnsweredCount: number;

  @Property({ apiProperty: { type: 'number', description: '답변 QnA 개수' } })
  answeredCount: number;

  constructor(props: QnACountSummaryDTOProps) {
    this.notAnsweredCount = props.notAnsweredCount;
    this.answeredCount = props.answeredCount;
  }
}
