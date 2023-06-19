import { Property } from 'wemacu-nestjs';

export interface UpdateReviewReportDTOProps {
  reportType?: number;
  content?: string;
}

export class UpdateReviewReportDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '신고 타입' } })
  reportType?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '신고 내용' } })
  content?: string;

  constructor(props?: UpdateReviewReportDTOProps) {
    if (props) {
      this.reportType = props.reportType;
      this.content = props.content;
    }
  }
}
