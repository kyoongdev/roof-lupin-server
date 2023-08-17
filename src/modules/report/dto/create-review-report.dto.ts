import { Property } from 'cumuco-nestjs';

import { BaseCreateReportDTO, BaseCreateReportDTOProps } from './base-create-report.dto';

export interface CreateReviewReportDTOProps extends BaseCreateReportDTOProps {
  reviewId: string;
}

export class CreateReviewReportDTO extends BaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '리뷰 ID' } })
  reviewId: string;

  constructor(props?: CreateReviewReportDTOProps) {
    super(props);
    if (props) {
      this.reviewId = props.reviewId;
    }
  }
}
