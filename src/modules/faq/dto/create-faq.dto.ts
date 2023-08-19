import { Property } from 'cumuco-nestjs';

export interface CreateFAQDTOProps {
  question: string;
}

export class CreateFAQDTO {
  @Property({ apiProperty: { type: 'string', description: '질문' } })
  question: string;

  constructor(props?: CreateFAQDTOProps) {
    if (props) {
      this.question = props.question;
    }
  }
}
