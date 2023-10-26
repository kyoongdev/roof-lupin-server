import { Property } from 'cumuco-nestjs';

import { HostBaseCreateReportDTO, HostBaseCreateReportDTOProps } from './base-create-report.dto';

export interface HostCreateReviewReportDTOProps extends HostBaseCreateReportDTOProps {
  spaceReviewId: string;
}

export class HostCreateReviewReportDTO extends HostBaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '리뷰 id' } })
  spaceReviewId: string;

  constructor(props?: HostCreateReviewReportDTOProps) {
    super(props);
    if (props) {
      this.spaceReviewId = props.spaceReviewId;
    }
  }
}
