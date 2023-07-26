import { Property } from 'cumuco-nestjs';

export interface CreateUserCouponDTOProps {
  count?: number;
  userId: string;
  usageDateStartAt: Date;
  usageDateEndAt: Date;
}

export class CreateUserCouponDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } })
  count?: number;

  @Property({ apiProperty: { type: 'string', description: '유저 id' } })
  userId: string;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 사용 시작기간' } })
  usageDateStartAt: Date;

  @Property({ apiProperty: { type: 'string', description: '쿠폰 사용 종료기간' } })
  usageDateEndAt: Date;

  constructor(props?: CreateUserCouponDTOProps) {
    if (props) {
      this.count = props.count;
      this.userId = props.userId;
      this.usageDateStartAt = props.usageDateStartAt;
      this.usageDateEndAt = props.usageDateEndAt;
    }
  }
}
