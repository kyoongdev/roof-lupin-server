import { ErrorCode } from 'cumuco-nestjs';
export declare const CATEGORY_NOT_FOUND: "카테고리를 찾을 수 없습니다.";
export declare const HOME_CATEGORY_COUNT: "홈 카테고리는 5개까지만 등록할 수 있습니다.";
export declare const HOME_CATEGORY_ICON_PATH_BAD_REQUEST: "홈 카테고리는 iconPath가 필수입니다.";
export declare const CONTENT_CATEGORY_NOT_FOUND: "콘텐츠 카테고리를 찾을 수 없습니다.";
export declare const CONTENT_CATEGORY_SPACE_NOT_FOUND: "콘텐츠 카테고리의 공간을 찾을 수 없습니다.";
export declare const CATEGORY_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'BAD_REQUEST'>;
