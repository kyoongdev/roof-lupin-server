import { Property } from 'wemacu-nestjs';

import { SpaceDetailDTO, SpaceDetailDTOProps } from '@/modules/space/dto';

import { ReportAnswerDTO, ReportAnswerDTOProps } from './report-answer.dto';
import { ReportDTO, ReportDTOProps } from './report.dto';

export interface ReportDetailDTOProps extends ReportDTOProps {
  space: SpaceDetailDTOProps;
  answer: ReportAnswerDTOProps;
}

export class ReportDetailDTO extends ReportDTO {
  @Property({ apiProperty: { type: SpaceDetailDTO, description: '신고된 공간' } })
  space: SpaceDetailDTO;

  @Property({ apiProperty: { type: ReportAnswerDTO, description: '신고 답변' } })
  answer: ReportAnswerDTO;

  constructor(props: ReportDetailDTOProps) {
    super(props);
    this.space = new SpaceDetailDTO(props.space);
    this.answer = new ReportAnswerDTO(props.answer);
  }
}
