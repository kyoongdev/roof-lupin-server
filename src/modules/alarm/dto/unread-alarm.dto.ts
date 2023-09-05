import { Property } from 'cumuco-nestjs';

export interface UnReadAlarmDTOProps {
  isExists: boolean;
}

export class UnReadAlarmDTO {
  @Property({ apiProperty: { type: 'boolean', description: '안읽은 알람이 존재하는지 여부' } })
  isExists: boolean;

  constructor(props: UnReadAlarmDTOProps) {
    this.isExists = props.isExists;
  }
}
