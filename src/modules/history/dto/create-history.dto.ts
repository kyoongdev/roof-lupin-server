import { Property } from 'cumuco-nestjs';

export interface CreateHistoryDTOProps {
  content: string;
  writtenAt: Date;
  spaceReviewId?: string;
  spaceReviewAnswerId?: string;
  spaceQnAId?: string;
  spaceQnAAnswerId?: string;
}

export class CreateHistoryDTO {
  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', format: 'date-time', description: '작성일' } })
  writtenAt: Date;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '리뷰 id' } })
  spaceReviewId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '리뷰 답변 id' } })
  spaceReviewAnswerId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: 'QnA id' } })
  spaceQnAId?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: 'QnA 답변 id' } })
  spaceQnAAnswerId?: string;

  constructor(props?: CreateHistoryDTOProps) {
    if (props) {
      this.content = props.content;
      this.writtenAt = props.writtenAt;
      this.spaceReviewId = props.spaceReviewId;
      this.spaceReviewAnswerId = props.spaceReviewAnswerId;
      this.spaceQnAId = props.spaceQnAId;
      this.spaceQnAAnswerId = props.spaceQnAAnswerId;
    }
  }
}
