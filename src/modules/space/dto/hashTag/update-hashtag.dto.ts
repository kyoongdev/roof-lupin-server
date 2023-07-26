import { Property } from 'cumuco-nestjs';

interface UpdateHashTagDTOProps {
  name: string;
}

export class UpdateHashTagDTO {
  @Property({ apiProperty: { type: 'string', description: '해시태그 이름' } })
  name: string;

  constructor(props?: UpdateHashTagDTOProps) {
    if (props) {
      this.name = props.name;
    }
  }
}
