import { Property } from 'cumuco-nestjs';

import { DateDTO, type DateProps } from '@/common';
import { SpaceDetailDTO, SpaceDetailDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';

export interface ReportDTOProps extends DateProps {
  id: string;
  title: string;
  content: string;
  user: CommonUserProps;
  isAnswered: boolean;
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

  @Property({ apiProperty: { type: 'boolean', description: '답변 여부' } })
  isAnswered: boolean;

  constructor(props: ReportDTOProps) {
    super();
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.user = new CommonUserDTO(props.user);
    this.isAnswered = props.isAnswered;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
