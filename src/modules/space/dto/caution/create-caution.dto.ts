import { Property } from 'wemacu-nestjs';

export interface CreateCautionDTOProps {
  content: string;
}

export class CreateCautionDTO {
  @Property({ apiProperty: { type: 'string', description: '주의사항 내용' } })
  content: string;

  constructor(props?: CreateCautionDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
