import { Property } from 'cumuco-nestjs';

export interface CreateFAQDTOProps {
  question: string;
  answer: string;
  order?: number;
}

export class CreateFAQDTO {
  @Property({ apiProperty: { type: 'string', description: '질문' } })
  question: string;

  @Property({ apiProperty: { type: 'string', description: '답변' } })
  answer: string;

  @Property({ apiProperty: { type: 'number', description: '순서', nullable: true } })
  order?: number;

  constructor(props?: CreateFAQDTOProps) {
    if (props) {
      this.question = props.question;
      this.answer = props.answer;
      this.order = props.order;
    }
  }
}
