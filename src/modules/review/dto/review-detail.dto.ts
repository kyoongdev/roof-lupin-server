import { Property } from 'cumuco-nestjs';

import { SpaceDTOProps } from '@/modules/space/dto';

import { ReviewSpaceDTO } from './review-space.dto';
import { ReviewDTO, ReviewDTOProps } from './review.dto';

export interface ReviewDetailDTOProps extends ReviewDTOProps {
  space: SpaceDTOProps;
}

export class ReviewDetailDTO extends ReviewDTO {
  @Property({ apiProperty: { type: ReviewSpaceDTO, description: '공간 정보' } })
  space: ReviewSpaceDTO;

  constructor(props: ReviewDetailDTOProps) {
    super(props);
    this.space = new ReviewSpaceDTO(props.space);
  }
}
