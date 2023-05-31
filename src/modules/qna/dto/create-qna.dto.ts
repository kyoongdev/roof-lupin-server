import { Property } from 'wemacu-nestjs';
interface CreateQnAProps {
  content: string;
  spaceId: string;
}

export class CreateQnADTO {
  @Property({ apiProperty: { type: 'string', description: 'qna 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: '공간 ID' } })
  spaceId: string;

  constructor(props?: CreateQnAProps) {
    if (props) {
      this.content = props.content;
      this.spaceId = props.spaceId;
    }
  }
}
