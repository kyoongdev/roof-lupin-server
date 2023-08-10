import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from 'cumuco-nestjs';

export const LOCATION_FILTER_GROUP_NOT_FOUND = '위치 필터 그룹을 찾을 수 없습니다.' as const;
export const LOCATION_FILTER = '위치 필터를 찾을 수 없습니다.' as const;
