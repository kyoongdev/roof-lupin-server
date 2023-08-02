import { Property } from 'cumuco-nestjs';

export interface CreateTermDTOProps {
  name: string;
  content: string;
}

export class CreateTermDTO {
  @Property({ apiProperty: { type: 'string', description: '이름' } })
  name: string;

  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  constructor(props?: CreateTermDTOProps) {
    if (props) {
      this.name = props.name;
      this.content = props.content;
    }
  }
}
