import { Property } from 'cumuco-nestjs';

export interface UpdateFrequentQuestionDTOProps {
  question?: string;
  answer?: string;
}

export class UpdateFrequentQuestionDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '질문' } })
  question?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '답변' } })
  answer?: string;

  constructor(props?: UpdateFrequentQuestionDTOProps) {
    if (props) {
      this.question = props.question;
      this.answer = props.answer;
    }
  }
}
