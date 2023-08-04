import { ErrorCode } from 'cumuco-nestjs';
export declare const FAQ_NOT_FOUND: "FAQ를 찾을 수 없습니다.";
export declare const FAQ_MUTATION_FORBIDDEN: "본인의 FAQ만 수정/삭제할 수 없습니다.";
export declare const FAQ_ERROR_CODE: ErrorCode<'NOT_FOUND' | 'FORBIDDEN'>;
