import { PagingDTO } from 'cumuco-nestjs';
import { ADMIN_SPACE_SORT_OPTION } from '../../validation/space-sort.validation';
export declare class AdminFindSpacesQuery extends PagingDTO {
    title?: string;
    isApproved?: boolean;
    isPublic?: boolean;
    sort?: keyof typeof ADMIN_SPACE_SORT_OPTION;
}
