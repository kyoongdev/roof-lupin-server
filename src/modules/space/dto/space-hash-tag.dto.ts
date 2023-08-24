import { Property } from 'cumuco-nestjs';

import { HashTagDTO, HashTagDTOProps } from './hashTag';

export interface SpaceHashTagDTOProps {
  hashTags: HashTagDTOProps[];
}

export class SpaceHashTagDTO {
  @Property({ apiProperty: { type: HashTagDTO, isArray: true, description: '해시태그 리스트' } })
  hashTags: HashTagDTO[];

  constructor(props: SpaceHashTagDTOProps) {
    this.hashTags = props.hashTags.map((hashTag) => new HashTagDTO(hashTag));
  }
}
