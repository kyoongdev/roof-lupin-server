import { Property } from 'cumuco-nestjs';

export interface FrequentQuestionDTOProps {
  id: string;
  question: string;
  answer: string;
}

export class FrequentQuestionDTO {
  @Property({ apiProperty: { type: 'string', description: '아이디' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '질문' } })
  question: string;

  @Property({ apiProperty: { type: 'string', description: '답변' } })
  answer: string;

  constructor(props: FrequentQuestionDTOProps) {
    this.id = props.id;
    this.question = props.question;
    this.answer = props.answer;
  }
}
