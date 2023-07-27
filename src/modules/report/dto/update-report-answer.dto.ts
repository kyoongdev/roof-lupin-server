import { Property } from 'cumuco-nestjs';

export interface UpdateReportAnswerDTOProps {
  content: string;
}

export class UpdateReportAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '신고 답변 내용' } })
  content: string;

  constructor(props?: UpdateReportAnswerDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
