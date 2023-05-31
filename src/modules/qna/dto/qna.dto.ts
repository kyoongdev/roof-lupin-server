import { Property } from 'wemacu-nestjs';

import { DateDTO, DateProps } from '@/common';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';

export interface QnAProps extends DateProps {
  id: string;
  content: string;
  user: CommonUserProps;
}

//TODO: space dto 추가
export class QnADTO extends DateDTO {
  @Property({ apiProperty: { type: 'string', description: 'QnA ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '유저' } })
  user: CommonUserDTO;

  constructor(props: QnAProps) {
    super();
    this.id = props.id;
    this.content = props.content;
    this.user = new CommonUserDTO(props.user);
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
