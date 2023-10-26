import { Property } from 'cumuco-nestjs';

import { BaseCreateReportDTO, BaseCreateReportDTOProps } from './base-create-report.dto';

export interface CreateReviewAnswerReportDTOProps extends BaseCreateReportDTOProps {
  reviewAnswerId: string;
}

export class CreateReviewAnswerReportDTO extends BaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: 'ReviewAnswer ID' } })
  reviewAnswerId: string;

  constructor(props?: CreateReviewAnswerReportDTOProps) {
    super(props);
    if (props) {
      this.reviewAnswerId = props.reviewAnswerId;
    }
  }
}
