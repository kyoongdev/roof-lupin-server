import { Property } from 'cumuco-nestjs';

import { QnADTO, QnADTOProps } from '@/modules/qna/dto';
import { ReviewDTO, ReviewDTOProps } from '@/modules/review/dto';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { ReportAnswerDTO, ReportAnswerDTOProps } from './report-answer.dto';
import { ReportStatusResDecorator } from './validation';

export interface ReportDTOProps {
  id: string;
  reportStatus: number;
  content: string;
  space?: SpaceDTOProps;
  spaceReview?: ReviewDTOProps;
  spaceQnA?: QnADTOProps;
  user: CommonUserProps;
  createdAt: Date;
  answer: ReportAnswerDTOProps;
}

export class ReportDTO {
  @Property({ apiProperty: { type: 'string', description: 'id' } })
  id: string;

  @ReportStatusResDecorator()
  reportStatus: number;

  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  @Property({ apiProperty: { type: SpaceDTO, nullable: true, description: '공간 정보' } })
  space?: SpaceDTO;

  @Property({ apiProperty: { type: ReviewDTO, nullable: true, description: '공간 리뷰 정보' } })
  spaceReview?: ReviewDTO;

  @Property({ apiProperty: { type: QnADTO, nullable: true, description: '공간 QnA 정보' } })
  spaceQnA?: QnADTO;

  @Property({ apiProperty: { type: CommonUserDTO, nullable: true, description: '유저 정보' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: 'string', description: '신고 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: ReportAnswerDTO, nullable: true, description: '신고 답변' } })
  answer: ReportAnswerDTO;

  constructor(props: ReportDTOProps) {
    this.id = props.id;
    this.reportStatus = props.reportStatus;
    this.content = props.content;
    this.space = props.space ? new SpaceDTO(props.space) : undefined;
    this.spaceReview = props.spaceReview ? new ReviewDTO(props.spaceReview) : undefined;
    this.spaceQnA = props.spaceQnA ? new QnADTO(props.spaceQnA) : undefined;
    this.user = new CommonUserDTO(props.user);
    this.createdAt = props.createdAt;
    this.answer = props.answer ? new ReportAnswerDTO(props.answer) : undefined;
  }
}
