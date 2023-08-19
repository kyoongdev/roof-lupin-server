import { Property } from 'cumuco-nestjs';

export interface ReviewImageDTOProps {
  id: string;
  imageId: string;
  url: string;
  isBest: boolean;
  reviewId: string;
}

export class ReviewImageDTO {
  @Property({ apiProperty: { type: 'string', description: ' id' } })
  id: string;

  @Property({ apiProperty: { type: 'string', description: '이미지 id' } })
  imageId: string;

  @Property({ apiProperty: { type: 'string', description: '이미지 url' } })
  url: string;

  @Property({ apiProperty: { type: 'boolean', description: '베스트 이미지 여부' } })
  isBest: boolean;

  @Property({ apiProperty: { type: 'string', description: '리뷰 id' } })
  reviewId: string;

  constructor(props: ReviewImageDTOProps) {
    this.imageId = props.imageId;
    this.url = props.url;
    this.isBest = props.isBest;
    this.reviewId = props.reviewId;
  }
}
