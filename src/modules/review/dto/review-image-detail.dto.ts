import { Property } from 'cumuco-nestjs';

import { ReviewDTO, ReviewDTOProps } from './review.dto';

export interface ReviewImageDetailDTOProps {
  imageId: string;
  isBest: boolean;
  url: string;
  review: ReviewDTOProps;
}

export class ReviewImageDetailDTO {
  @Property({ apiProperty: { type: 'string', description: '이미지 id' } })
  imageId: string;

  @Property({ apiProperty: { type: 'boolean', description: '베스트 이미지 여부' } })
  isBest: boolean;

  @Property({ apiProperty: { type: 'string', description: '이미지 url' } })
  url: string;

  @Property({ apiProperty: { type: ReviewDTO, description: '리뷰' } })
  review: ReviewDTO;

  constructor(props: ReviewImageDetailDTOProps) {
    this.imageId = props.imageId;
    this.isBest = props.isBest;
    this.url = props.url;
    this.review = new ReviewDTO(props.review);
  }
}
