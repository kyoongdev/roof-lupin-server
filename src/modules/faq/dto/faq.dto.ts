import { Property } from 'wemacu-nestjs';

export interface FAQDTOProps {
  id: string;
  question: string;
  answer: string;
}

export class FAQDTO {
  @Property({ apiProperty: { type: 'string', description: 'faq id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '질문' } })
  question: string;

  @Property({ apiProperty: { type: 'string', description: '답변' } })
  answer: string;

  constructor(props: FAQDTOProps) {
    this.id = props.id;
    this.question = props.question;
    this.answer = props.answer;
  }
}
