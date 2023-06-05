import { Property } from 'wemacu-nestjs';

import { DateDTO, DateProps } from '@/common';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';

import { QnAAnswerDTO, QnAAnswerProps } from './qna-answer.dto';

export interface QnADTOProps extends DateProps {
  id: string;
  content: string;
  user: CommonUserProps;
  answers: QnAAnswerProps[];
}

//TODO: space dto 추가
export class QnADTO extends DateDTO {
  @Property({ apiProperty: { type: 'string', description: 'QnA ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '유저' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: QnAAnswerDTO, description: '답변', isArray: true } })
  answers: QnAAnswerDTO[];

  constructor(props: QnADTOProps) {
    super();
    this.id = props.id;
    this.content = props.content;
    this.user = new CommonUserDTO(props.user);
    this.answers = props.answers.map((answer) => new QnAAnswerDTO(answer));
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
