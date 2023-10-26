import { Property } from 'cumuco-nestjs';

import { HostBaseCreateReportDTO, HostBaseCreateReportDTOProps } from './base-create-report.dto';

export interface HostCreateQnAReportDTOProps extends HostBaseCreateReportDTOProps {
  spaceQnAId: string;
}

export class HostCreateQnAReportDTO extends HostBaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: 'qna id' } })
  spaceQnAId: string;

  constructor(props?: HostCreateQnAReportDTOProps) {
    super(props);
    if (props) {
      this.spaceQnAId = props.spaceQnAId;
    }
  }
}
