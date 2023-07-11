import { User } from '@prisma/client';
import { Expose } from 'class-transformer';
import { Property } from 'wemacu-nestjs';

import { GENDER_VALUE, GenderReqTransForm, GenderResTransForm } from '@/utils/validation';

import { BaseUserDTO } from './base-user.dto';

export type CommonUserProps = Partial<User>;

export class CommonUserDTO extends BaseUserDTO {
  @Property({ apiProperty: { type: 'string' } })
  id: string;

  @Property({ apiProperty: { type: 'string' } })
  nickname: string;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  email?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '-을 제외한 11자리 입니다.' } })
  phoneNumber?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } })
  birthDay?: string;

  @Property({ apiProperty: { type: 'string', nullable: true, minLength: 4, maxLength: 4 } })
  birthYear?: string;

  @GenderResTransForm()
  @Property({ apiProperty: { type: 'string', nullable: true, example: GENDER_VALUE.join(',') + ',NULL' } })
  gender?: number;

  @Property({ apiProperty: { type: 'string', nullable: true } })
  profileImage?: string;

  @Property({ apiProperty: { type: 'boolean', description: '성인 인증 여부' } })
  isAdult: boolean;

  @Property({ apiProperty: { type: 'boolean', description: '알림 승인 여부' } })
  isAlarmAccepted: boolean;

  constructor(props: CommonUserProps) {
    super();
    this.id = props.id;
    this.nickname = props.nickname;
    this.email = props.email ?? null;
    this.phoneNumber = props.phoneNumber ?? null;
    this.birthYear = props.birthYear ?? null;
    this.birthDay = props.birthDay ?? null;
    this.gender = props.gender;
    this.profileImage = props.profileImage ?? null;
    this.isAdult = props.isAdult;
    this.isAlarmAccepted = props.isAlarmAccepted;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }
}
