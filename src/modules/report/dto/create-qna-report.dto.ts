import { Property } from 'cumuco-nestjs';

import { BaseCreateReportDTO, BaseCreateReportDTOProps } from './base-create-report.dto';

export interface CreateQnAReportDTOProps extends BaseCreateReportDTOProps {
  qnaId: string;
}

export class CreateQnAReportDTO extends BaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: 'QnA ID' } })
  qnaId: string;

  constructor(props?: CreateQnAReportDTOProps) {
    super(props);
    if (props) {
      this.qnaId = props.qnaId;
    }
  }
}
