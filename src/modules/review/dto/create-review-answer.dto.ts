import { Property } from 'wemacu-nestjs';

export interface CreateReviewAnswerDTOProps {
  content: string;
}

export class CreateReviewAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 내용' } })
  content: string;

  constructor(props?: CreateReviewAnswerDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
