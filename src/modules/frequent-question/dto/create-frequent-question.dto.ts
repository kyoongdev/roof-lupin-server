import { Property } from 'cumuco-nestjs';

export interface CreateFrequentQuestionDTOProps {
  question: string;
  answer: string;
}

export class CreateFrequentQuestionDTO {
  @Property({ apiProperty: { type: 'string', description: '질문' } })
  question: string;

  @Property({ apiProperty: { type: 'string', description: '답변' } })
  answer: string;

  constructor(props?: CreateFrequentQuestionDTOProps) {
    if (props) {
      this.question = props.question;
      this.answer = props.answer;
    }
  }
}
