import { ReviewDTO, ReviewDTOProps } from './review.dto';

export type ReviewDetailDTOProps = ReviewDTOProps;

export class ReviewDetailDTO extends ReviewDTO {
  constructor(props: ReviewDetailDTOProps) {
    super(props);
  }
}
