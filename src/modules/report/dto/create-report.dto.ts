import { Property } from 'cumuco-nestjs';

export interface CreateReportDTOProps {
  content: string;
  spaceId?: string;
  spaceReviewId?: string;
  spaceQnaId?: string;
}

export class CreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '공간 ID' } })
  spaceId?: string;

  @Property({ apiProperty: { type: 'string', description: '공간 리뷰 ID' } })
  spaceReviewId?: string;

  @Property({ apiProperty: { type: 'string', description: '공간 Q&A ID' } })
  spaceQnaId?: string;

  constructor(props?: CreateReportDTOProps) {
    if (props) {
      this.content = props.content;
      this.spaceId = props.spaceId;
      this.spaceReviewId = props.spaceReviewId;
      this.spaceQnaId = props.spaceQnaId;
    }
  }
}
