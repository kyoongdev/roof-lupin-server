import { PagingDTO } from 'cumuco-nestjs';
import { REVIEWS_SORT } from '../validation';
export declare class FindReviewsQuery extends PagingDTO {
    sort?: keyof typeof REVIEWS_SORT;
    hasPhoto: boolean;
}
