import { Property } from 'cumuco-nestjs';

export interface CreateReviewReportDTOProps {
  content: string;
}

export class CreateReviewReportDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  constructor(props?: CreateReviewReportDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
