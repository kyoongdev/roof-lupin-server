import { PagingDTO, Property, ToBoolean } from 'wemacu-nestjs';

import { REVIEWS_SORT, REVIEWS_SORT_KEYS } from '../validation';

export class FindReviewsQuery extends PagingDTO {
  @Property({ apiProperty: { type: 'string', nullable: true, description: '정렬', enum: REVIEWS_SORT_KEYS } })
  sort?: keyof typeof REVIEWS_SORT;

  @ToBoolean()
  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '사진이 있는 리뷰만 가져오기' } })
  hasPhoto: boolean;
}
