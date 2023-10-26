import { Property } from 'cumuco-nestjs';

export interface HostCreateReportDTOProps {
  content: string;
  spaceReviewId?: string;
  spaceQnaId?: string;
}

export class HostCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '공간 리뷰 ID', nullable: true } })
  spaceReviewId?: string;

  @Property({ apiProperty: { type: 'string', description: '공간 Q&A ID', nullable: true } })
  spaceQnaId?: string;

  constructor(props?: HostCreateReportDTOProps) {
    if (props) {
      this.content = props.content;
      this.spaceReviewId = props.spaceReviewId;
      this.spaceQnaId = props.spaceQnaId;
    }
  }

  checkIsOnlyOneTarget(): boolean {
    const count = [this.spaceReviewId, this.spaceQnaId].filter(Boolean).length;

    if (count > 1) {
      return false;
    }

    return true;
  }
}
