import { Property } from 'wemacu-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

import { ReportAnswerDTO, ReportAnswerDTOProps } from './report-answer.dto';
import { ReportDTO, ReportDTOProps } from './report.dto';

export interface ReportDetailDTOProps extends ReportDTOProps {
  space: SpaceDTOProps;
  answer: ReportAnswerDTOProps;
}

export class ReportDetailDTO extends ReportDTO {
  @Property({ apiProperty: { type: SpaceDTO, description: '신고된 공간' } })
  space: SpaceDTO;

  @Property({ apiProperty: { type: ReportAnswerDTO, nullable: true, description: '신고 답변' } })
  answer?: ReportAnswerDTO;

  constructor(props: ReportDetailDTOProps) {
    super(props);
    this.space = new SpaceDTO(props.space);
    this.answer = props.answer ? new ReportAnswerDTO(props.answer) : null;
  }
}
