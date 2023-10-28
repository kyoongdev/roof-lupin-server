import { Property } from 'cumuco-nestjs';
export interface CreateQnAAnswerProps {
  content: string;
}

export class CreateQnAAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 내용' } })
  content: string;

  constructor(props?: CreateQnAAnswerDTO) {
    if (props) {
      this.content = props.content;
    }
  }
}
