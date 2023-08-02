import { Property } from 'cumuco-nestjs';

export interface TermDTOProps {
  content?: string;
  name: string;
}

export class TermDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '내용' } })
  content?: string;

  constructor(props: TermDTOProps) {
    this.content = props.content;
    this.name = props.name;
  }
}
