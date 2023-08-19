import { Property } from 'cumuco-nestjs';

import { DayValidation } from '@/utils';

export interface CreateFAQDTOProps {
  question: string;
}

class TestDurationDTO {
  @Property({ apiProperty: { type: 'number' } })
  startAt: number;

  @Property({ apiProperty: { type: 'number' } })
  endAT: number;
}
export class CreateFAQDTO {
  @Property({ apiProperty: { type: 'string', description: '질문' } })
  question: string;

  @DayValidation()
  @Property({ apiProperty: { type: TestDurationDTO, description: '테스트' } })
  test: TestDurationDTO;

  constructor(props?: CreateFAQDTOProps) {
    if (props) {
      this.question = props.question;
    }
  }
}
