import { Property } from 'cumuco-nestjs';

interface UpdateCautionDTOProps {
  content: string;
}

export class UpdateCautionDTO {
  @Property({ apiProperty: { type: 'string', description: '주의사항 내용' } })
  content: string;

  constructor(props?: UpdateCautionDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
