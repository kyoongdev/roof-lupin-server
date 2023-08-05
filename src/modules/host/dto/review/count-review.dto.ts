import { Property } from 'cumuco-nestjs';

export interface ReportCountDTOProps {
  count: number;
}

export class ReportCountDTO {
  @Property({ apiProperty: { type: 'number', description: '개수' } })
  count: number;

  constructor(props: ReportCountDTOProps) {
    this.count = props.count;
  }
}
