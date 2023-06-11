import { Property } from 'wemacu-nestjs';

export interface UpdateHomeContentsDTOProps {
  name?: string;
  highlight?: string;
  spaceIds?: string[];
}

export class UpdateHomeContentsDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '홈 컨텐츠 이름' } })
  name?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '홈 컨텐츠 하이라이트' } })
  highlight: string | null;

  @Property({ apiProperty: { type: 'string', isArray: true, nullable: true, description: '홈 컨텐츠 공간 id' } })
  spaceIds?: string[];

  constructor(props?: UpdateHomeContentsDTOProps) {
    if (props) {
      this.name = props.name;
      this.highlight = props.highlight;
      this.spaceIds = props.spaceIds;
    }
  }
}
