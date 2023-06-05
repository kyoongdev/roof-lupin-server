import { Property } from 'wemacu-nestjs';

export interface UpdateFAQDTOProps {
  question?: string;
  answer?: string;
}

export class UpdateFAQDTO {
  @Property({ apiProperty: { type: 'string', description: '질문', nullable: true } })
  question?: string;

  @Property({ apiProperty: { type: 'string', description: '답변', nullable: true } })
  answer?: string;

  constructor(props?: UpdateFAQDTOProps) {
    if (props) {
      this.question = props.question;
      this.answer = props.answer;
    }
  }
}
