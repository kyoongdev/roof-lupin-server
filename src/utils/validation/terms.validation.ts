import { applyDecorators } from '@nestjs/common';

import { Transform } from 'class-transformer';
import { Property } from 'cumuco-nestjs';

import { GUEST_TERMS_KOR, HOST_TERMS_KOR } from '@/common/constants/terms';

export const termEngToKor = (name: string) => {
  const term = GUEST_TERMS_KOR[name] ? GUEST_TERMS_KOR[name] : HOST_TERMS_KOR[name] ? HOST_TERMS_KOR[name] : null;

  return term;
};

export const TermResponseTransForm = () => Transform(({ value }) => termEngToKor(value));
export const TermResDecorator = (nullable = false) =>
  applyDecorators(
    TermResponseTransForm(),
    Property({ apiProperty: { type: 'string', nullable, description: '이름' } })
  );
