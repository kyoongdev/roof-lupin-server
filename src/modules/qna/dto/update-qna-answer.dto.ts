import { Property } from 'wemacu-nestjs';

interface UpdateQnAAnswerProps {
  content?: string;
}

export class UpdateQnAAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 내용', nullable: true } })
  content?: string;

  constructor(props?: UpdateQnAAnswerProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
