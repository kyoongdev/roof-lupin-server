import { Property } from 'cumuco-nestjs';

export interface UpdateTermDTOProps {
  content: string;
}

export class UpdateTermDTO {
  @Property({ apiProperty: { type: 'string', description: '내용' } })
  content: string;

  constructor(props?: UpdateTermDTOProps) {
    if (props) {
      this.content = props.content;
    }
  }
}
