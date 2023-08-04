import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

import { GUEST_TERMS, GUEST_TERMS_KOR, HOST_TERMS, HOST_TERMS_KOR } from '@/common/constants/terms';

export const termEngToKor = (name: string) => {
  console.log(name);
  const term = GUEST_TERMS_KOR[name] ? GUEST_TERMS_KOR[name] : HOST_TERMS_KOR[name] ? HOST_TERMS_KOR[name] : null;

  return term;
};

export const TermResponseTransForm = () => Transform(({ value }) => termEngToKor(value));
export const TermResDecorator = (nullable = false) =>
  applyDecorators(TermResponseTransForm(), ApiProperty({ type: 'string', description: '이름' }));
