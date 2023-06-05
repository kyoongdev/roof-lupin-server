import { Property } from 'wemacu-nestjs';

interface UpdateHashtagDTOProps {
  name: string;
}

export class UpdateHashtagDTO {
  @Property({ apiProperty: { type: 'string', description: '해시태그 이름' } })
  name: string;

  constructor(props?: UpdateHashtagDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
