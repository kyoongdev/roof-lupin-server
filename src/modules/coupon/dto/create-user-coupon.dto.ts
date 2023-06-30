import { Property } from 'wemacu-nestjs';

export interface CreateUserCouponDTOProps {
  count?: number;
  userId: string;
  dueDateStartAt: Date;
  dueDateEndAt: Date;
}

export class CreateUserCouponDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } })
  count?: number;

  @Property({ apiProperty: { type: 'string', description: '유저 id' } })
  userId: string;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 유효기간 시작' } })
  dueDateStartAt: Date;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 유효기간 종료' } })
  dueDateEndAt: Date;

  constructor(props?: CreateUserCouponDTOProps) {
    if (props) {
      this.count = props.count;
      this.userId = props.userId;
      this.dueDateStartAt = props.dueDateStartAt;
    }
  }
}
