import { Property } from 'wemacu-nestjs';

interface QnAAnswerProps {
  id: string;
  content: string;
  qnaId: string;
}

export class QnAAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 ID' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '답변 내용' } })
  content: string;

  @Property({ apiProperty: { type: 'string', description: 'qna ID' } })
  qnaId: string;

  constructor(props: QnAAnswerProps) {
    this.id = props.id;
    this.content = props.content;
    this.qnaId = props.qnaId;
  }
}
