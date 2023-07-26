import { Property } from 'cumuco-nestjs';

export interface CreateHashTagDTOProps {
  name: string;
}

export class CreateHashTagDTO {
  @Property({ apiProperty: { type: 'string', description: '해시태그 이름' } })
  name: string;

  constructor(props?: CreateHashTagDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
