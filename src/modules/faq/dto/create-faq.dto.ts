import { Property } from 'wemacu-nestjs';

export interface CreateFAQDTOProps {
  question: string;
  answer: string;
}

export class CreateFAQDTO {
  @Property({ apiProperty: { type: 'string', description: '질문' } })
  question: string;

  @Property({ apiProperty: { type: 'string', description: '답변' } })
  answer: string;

  constructor(props?: CreateFAQDTOProps) {
    if (props) {
      this.question = props.question;
      this.answer = props.answer;
    }
  }
}
