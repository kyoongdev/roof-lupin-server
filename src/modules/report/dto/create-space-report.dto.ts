import { Property } from 'cumuco-nestjs';

import { BaseCreateReportDTO, BaseCreateReportDTOProps } from './base-create-report.dto';

export interface CreateSpaceReportDTOProps extends BaseCreateReportDTOProps {
  spaceId: string;
}

export class CreateSpaceReportDTO extends BaseCreateReportDTO {
  @Property({ apiProperty: { type: 'string', description: '공간 ID' } })
  spaceId: string;

  constructor(props?: CreateSpaceReportDTOProps) {
    super(props);
    if (props) {
      this.spaceId = props.spaceId;
    }
  }
}
