import { Property } from 'wemacu-nestjs';

import { SpaceDetailDTO, SpaceDetailDTOProps } from '@/modules/space/dto';

import { ReportDTO, ReportDTOProps } from './report.dto';

export interface ReportDetailDTOProps extends ReportDTOProps {
  space: SpaceDetailDTOProps;
}

export class ReportDetailDTO extends ReportDTO {
  @Property({ apiProperty: { type: SpaceDetailDTO, description: '신고된 공간' } })
  space: SpaceDetailDTO;

  constructor(props: ReportDetailDTOProps) {
    super(props);
    this.space = new SpaceDetailDTO(props.space);
  }
}
