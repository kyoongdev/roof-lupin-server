import { Property } from 'cumuco-nestjs';

export interface AdminUpdateFAQAnswerDTOProps {
  answer: string;
}

export class AdminUpdateFAQAnswerDTO {
  @Property({ apiProperty: { type: 'string', description: '답변' } })
  answer: string;

  constructor(props: AdminUpdateFAQAnswerDTOProps) {
    this.answer = props.answer;
  }
}
