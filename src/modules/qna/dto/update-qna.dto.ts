import { Property } from 'wemacu-nestjs';

interface UpdateQnAProps {
  content?: string;
}

export class UpdateQnADTO {
  @Property({ apiProperty: { type: 'string', description: 'qna 내용', nullable: true } })
  content?: string;

  constructor(props?: UpdateQnAProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
