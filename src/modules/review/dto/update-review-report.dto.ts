import { Property } from 'cumuco-nestjs';

export interface UpdateReviewReportDTOProps {
  content?: string;
}

export class UpdateReviewReportDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '신고 내용' } })
  content?: string;

  constructor(props?: UpdateReviewReportDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
