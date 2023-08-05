import { Property } from 'cumuco-nestjs';

import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';

import { ReviewDTO, ReviewDTOProps } from './review.dto';

export interface ReviewDetailDTOProps extends ReviewDTOProps {
  space: SpaceDTOProps;
}

export class ReviewDetailDTO extends ReviewDTO {
  @Property({ apiProperty: { type: SpaceDTO, description: '공간 정보' } })
  space: SpaceDTO;

  constructor(props: ReviewDetailDTOProps) {
    super(props);
    this.space = new SpaceDTO(props.space);
  }
}
