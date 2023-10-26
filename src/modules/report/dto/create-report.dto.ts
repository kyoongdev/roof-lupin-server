import { Property } from 'cumuco-nestjs';

export interface CreateReportDTOProps {
  content: string;
  spaceId?: string;
  spaceReviewId?: string;
  reviewAnswerId?: string;
  spaceQnaId?: string;
  qnaAnswerId?: string;
}

export class CreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '공간 ID', nullable: true } })
  spaceId?: string;

  @Property({ apiProperty: { type: 'string', description: '공간 리뷰 ID', nullable: true } })
  spaceReviewId?: string;

  @Property({ apiProperty: { type: 'string', description: '공간 Q&A ID', nullable: true } })
  spaceQnaId?: string;

  @Property({ apiProperty: { type: 'string', description: 'QnAAnswer ID', nullable: true } })
  qnaAnswerId?: string;

  @Property({ apiProperty: { type: 'string', description: 'ReviewAnswer ID', nullable: true } })
  reviewAnswerId?: string;

  constructor(props?: CreateReportDTOProps) {
    if (props) {
      this.content = props.content;
      this.spaceId = props.spaceId;
      this.spaceReviewId = props.spaceReviewId;
      this.spaceQnaId = props.spaceQnaId;
      this.qnaAnswerId = props.qnaAnswerId;
      this.reviewAnswerId = props.reviewAnswerId;
    }
  }

  checkIsOnlyOneTarget(): boolean {
    const count = [this.spaceId, this.spaceReviewId, this.spaceQnaId, this.qnaAnswerId, this.reviewAnswerId].filter(
      Boolean
    ).length;

    if (count > 1) {
      return false;
    }

    return true;
  }
}
