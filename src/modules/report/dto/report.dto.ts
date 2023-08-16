import { Property } from 'cumuco-nestjs';

import { QnADTO, QnADTOProps } from '@/modules/qna/dto';
import { ReviewDTOProps } from '@/modules/review/dto';
import { SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserProps } from '@/modules/user/dto';

export interface ReportDTOProps {
  id: string;
  reportStatus: number;
  content: string;
  space?: SpaceDTOProps;
  spaceReview?: ReviewDTOProps;
  spaceQnA?: QnADTOProps;
  user?: CommonUserProps;
  createdAt: Date;
  updatedAt: Date;
  answer: any;
}

export class ReportDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @Property({ apiProperty: { type: 'number', description: '신고 상태' } })
  reportStatus: number;
}
