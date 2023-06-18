import { Property } from 'wemacu-nestjs';

export interface UpdateReviewAnswerDTOProps {
  content: string;
}

export class UpdateReviewAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 내용' } })
  content: string;

  constructor(props?: UpdateReviewAnswerDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
