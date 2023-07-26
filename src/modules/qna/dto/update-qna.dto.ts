import { Property } from 'cumuco-nestjs';

interface UpdateQnADTOProps {
  content?: string;
}

export class UpdateQnADTO {
  @Property({ apiProperty: { type: 'string', description: 'qna 내용', nullable: true } })
  content?: string;

  constructor(props?: UpdateQnADTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
