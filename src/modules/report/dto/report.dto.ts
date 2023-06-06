import { Property } from 'wemacu-nestjs';

import { DateDTO, type DateProps } from '@/common';
import { SpaceDetailDTO, SpaceDetailDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';

export interface ReportDTOProps extends DateProps {
  id: string;
  title: string;
  content: string;
  user: CommonUserProps;
  space: SpaceDetailDTOProps;
}

export class ReportDTO extends DateDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '신고 제목' } })
  title: string;

  @Property({ apiProperty: { type: 'string', description: '신고 내용' } })
  content: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '신고자' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: SpaceDetailDTO, description: '신고된 공간' } })
  space: SpaceDetailDTO;

  constructor(props: ReportDTOProps) {
    super();
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.user = new CommonUserDTO(props.user);
    this.space = new SpaceDetailDTO(props.space);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
