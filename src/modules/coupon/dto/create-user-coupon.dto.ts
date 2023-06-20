import { Property } from 'wemacu-nestjs';

export interface CreateUserCouponDTOProps {
  count?: number;
  dueDate: Date;
  isUsed: boolean;
  userId: string;
}

export class CreateUserCouponDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } })
  count?: number;

  @Property({ apiProperty: { type: 'date', description: '쿠폰 만료일' } })
  dueDate: Date;

  @Property({ apiProperty: { type: 'boolean', description: '쿠폰 사용 여부' } })
  isUsed: boolean;

  @Property({ apiProperty: { type: 'string', description: '유저 id' } })
  userId: string;

  constructor(props: CreateUserCouponDTOProps) {
    this.count = props.count;
    this.dueDate = props.dueDate;
    this.isUsed = props.isUsed;
    this.userId = props.userId;
  }
}
