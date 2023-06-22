import { Property } from 'wemacu-nestjs';

import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

export interface ReviewReportDTOProps {
  id: string;

  content: string;
  isProcessed: boolean;
  createdAt: Date;
  user: CommonUserProps;
}

export class ReviewReportDTO {
  @Property({ apiProperty: { type: 'string', description: '리뷰 신고 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'boolean', description: '신고 처리 여부' } })
  isProcessed: boolean;

  @Property({ apiProperty: { type: 'string', description: '신고 날짜' } })
  createdAt: Date;

  @Property({ apiProperty: { type: CommonUserDTO, description: '신고자 정보' } })
  user: CommonUserDTO;

  constructor(props: ReviewReportDTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.isProcessed = props.isProcessed;
    this.createdAt = props.createdAt;
    this.user = new CommonUserDTO(props.user);
  }
}
