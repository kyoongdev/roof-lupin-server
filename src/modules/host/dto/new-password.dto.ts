import { Property } from 'wemacu-nestjs';

export interface NewPasswordDTOProps {
  newPassword: string;
}

export class NewPasswordDTO {
  @Property({ apiProperty: { type: 'string', description: '새로운 비밀번호' } })
  newPassword: string;

  constructor(props: NewPasswordDTOProps) {
    this.newPassword = props.newPassword;
  }
}
