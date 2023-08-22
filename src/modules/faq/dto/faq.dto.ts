import { Property } from 'cumuco-nestjs';

import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

export interface FAQDTOProps {
  id: string;
  question: string;
  answer?: string;
  user?: CommonUserProps;
  createdAt?: Date;
  deletedAt?: Date;
}

export class FAQDTO {
  @Property({ apiProperty: { type: 'string', description: 'faq id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '질문' } })
  question: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '답변' } })
  answer?: string;

  @Property({ apiProperty: { type: CommonUserDTO, nullable: true, description: '유저' } })
  user?: CommonUserDTO;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '생성일' } })
  createdAt?: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time', nullable: true, description: '삭제일' } })
  deletedAt?: Date;

  constructor(props: FAQDTOProps) {
    this.id = props.id;
    this.question = props.question;
    this.answer = props.answer;
    this.user = props.user ? new CommonUserDTO(props.user) : null;
    this.createdAt = props.createdAt;
    this.deletedAt = props.deletedAt;
  }
}
