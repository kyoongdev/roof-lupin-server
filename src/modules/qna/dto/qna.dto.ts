import { Prisma } from '@prisma/client';
import { Property } from 'cumuco-nestjs';

import { DateDTO, DateProps } from '@/common';
import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';

import { QnAAnswerDTO, QnAAnswerProps } from './qna-answer.dto';

export interface QnADTOProps extends DateProps {
  id: string;
  content: string;
  user: CommonUserProps;
  answers: QnAAnswerProps[];
  space: SpaceDTOProps;
}

//TODO: space dto 추가
export class QnADTO {
  @Property({ apiProperty: { type: 'string', description: 'QnA ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '유저' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: QnAAnswerDTO, description: '답변', isArray: true } })
  answers: QnAAnswerDTO[];

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', format: 'date-time' } })
  updatedAt: Date;

  @Property({ apiProperty: { type: SpaceDTO, description: '공간' } })
  space: SpaceDTO;

  constructor(props: QnADTOProps) {
    this.id = props.id;
    this.content = props.content;
    this.user = new CommonUserDTO(props.user);
    this.answers = props.answers.map((answer) => new QnAAnswerDTO(answer));
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.space = new SpaceDTO(props.space);
  }

  static generateInclude() {
    return {
      answers: {
        include: {
          host: true,
        },
      },
      user: true,
      space: {
        include: SpaceDTO.getSpacesIncludeOption(),
      },
    };
  }
}
