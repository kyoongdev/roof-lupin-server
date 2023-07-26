import { Property } from 'cumuco-nestjs';
export interface CreateQnAAnswerProps {
  content: string;
  spaceQnAId: string;
}

export class CreateQnAAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: 'qna ID' } })
  qnaId: string;

  constructor(props?: CreateQnAAnswerDTO) {
    if (props) {
      this.content = props.content;
      this.qnaId = props.qnaId;
    }
  }
}
