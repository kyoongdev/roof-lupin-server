import { Property } from 'wemacu-nestjs';
interface CautionDTOProps {
  id: string;
  content: string;
}

export class CautionDTO {
  @Property({ apiProperty: { type: 'string', description: '주의사항 id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '주의사항 내용' } })
  content: string;

  constructor(props: CautionDTOProps) {
    this.id = props.id;
    this.content = props.content;
  }
}
