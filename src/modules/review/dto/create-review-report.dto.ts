import { Property } from 'wemacu-nestjs';

export interface CreateReviewReportDTOProps {
  reportType: number;
  content: string;
}

export class CreateReviewReportDTO {
  @Property({ apiProperty: { type: 'number', description: '신고 타입' } })
  reportType: number;

  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  constructor(props?: CreateReviewReportDTOProps) {
    if (props) {
      this.reportType = props.reportType;
      this.content = props.content;
    }
  }
}
