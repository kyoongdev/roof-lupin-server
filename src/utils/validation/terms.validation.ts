import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

import { Transform } from 'class-transformer';

import { GUEST_TERMS, HOST_TERMS } from '@/common/constants/terms';

export const termEngToKor = (name: string) => {
  const term = GUEST_TERMS[name] ? GUEST_TERMS[name] : HOST_TERMS[name] ? HOST_TERMS[name] : null;

  return term;
};

export const TermResponseTransForm = () => Transform(({ value }) => termEngToKor(value));
export const TermResDecorator = (nullable = false) =>
  applyDecorators(TermResponseTransForm(), ApiProperty({ type: 'string', description: '이름' }));
