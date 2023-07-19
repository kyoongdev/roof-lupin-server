import { Property } from 'wemacu-nestjs';

export interface CreateReportAnswerDTOProps {
  content: string;
}

export class CreateReportAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 답변 내용' } })
  content: string;

  constructor(props?: CreateReportAnswerDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
