import { Property } from 'wemacu-nestjs';

import { DateDTO, type DateProps } from '@/common';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';

interface ReportProps extends DateProps {
  id: string;
  title: string;
  content: string;
  user: CommonUserProps;
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

  constructor(props: ReportProps) {
    super();
    this.id = props.id;
    this.title = props.title;
    this.content = props.content;
    this.user = new CommonUserDTO(props.user);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}