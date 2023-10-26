import { Property } from 'cumuco-nestjs';

import { BaseCreateReportDTO, BaseCreateReportDTOProps } from './base-create-report.dto';

export interface CreateQnAAnswerReportDTOProps extends BaseCreateReportDTOProps {
  qnaAnswerId: string;
}

export class CreateQnAAnswerReportDTO extends BaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: 'QnAAnswer ID' } })
  qnaAnswerId: string;

  constructor(props?: CreateQnAAnswerReportDTOProps) {
    super(props);
    if (props) {
      this.qnaAnswerId = props.qnaAnswerId;
    }
  }
}
