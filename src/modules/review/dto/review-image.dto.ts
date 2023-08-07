import { Property } from 'cumuco-nestjs';

export interface ReviewImageDTOProps {
  imageId: string;
  url: string;
  isBest: boolean;
}

export class ReviewImageDTO {
  @Property({ apiProperty: { type: 'string', description: '이미지 id' } })
  imageId: string;

  @Property({ apiProperty: { type: 'string', description: '이미지 url' } })
  url: string;

  @Property({ apiProperty: { type: 'boolean', description: '베스트 이미지 여부' } })
  isBest: boolean;

  constructor(props: ReviewImageDTOProps) {
    this.imageId = props.imageId;
    this.url = props.url;
    this.isBest = props.isBest;
  }
}
