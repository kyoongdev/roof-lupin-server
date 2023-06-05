import { Property } from 'wemacu-nestjs';

interface CreateHashtagDTOProps {
  name: string;
}

export class CreateHashtagDTO {
  @Property({ apiProperty: { type: 'string', description: '해시태그 이름' } })
  name: string;

  constructor(props?: CreateHashtagDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
