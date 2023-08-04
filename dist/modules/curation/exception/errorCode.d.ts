import { ErrorCode } from 'cumuco-nestjs';
export declare const CURATION_NOT_FOUND: "큐레이션을 찾을 수 없습니다.";
export declare const CURATION_SPACE_NOT_FOUND: "큐레이션 공간을 찾을 수 없습니다.";
export declare const CURATION_MUTATE_FORBIDDEN: "본인의 큐레이션만 수정/삭제가 가능합니다.";
export declare const CURATION_SPACE_ALREADY_EXIST: "이미 큐레이션에 등록된 공간입니다.";
export declare const CURATION_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'CONFLICT' | 'FORBIDDEN'>;
