import { Property } from 'cumuco-nestjs';

export interface CreateReportAnswerDTOProps {
  content: string;
}

export class CreateReportAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변 내용' } })
  content: string;

  constructor(props?: CreateReportAnswerDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
