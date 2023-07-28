import { Property } from 'cumuco-nestjs';

export interface UserUpdateFAQDTOProps {
  question?: string;
}

export class UserUpdateFAQDTO {
  @Property({ apiProperty: { type: 'string', description: '질문', nullable: true } })
  question?: string;

  constructor(props?: UserUpdateFAQDTOProps) {
    if (props) {
      this.question = props.question;
    }
  }
}
