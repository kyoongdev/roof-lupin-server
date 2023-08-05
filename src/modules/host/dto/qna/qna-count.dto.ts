import { Property } from 'cumuco-nestjs';

export interface QnACountDTOProps {
  count: number;
}

export class QnACountDTO {
  @Property({ apiProperty: { type: 'number', description: 'QnA 개수' } })
  count: number;

  constructor(props: QnACountDTOProps) {
    this.count = props.count;
  }
}
