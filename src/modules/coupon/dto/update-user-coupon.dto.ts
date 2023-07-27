import { Property } from 'cumuco-nestjs';

export interface UpdateUserCouponDTOProps {
  count?: number;
  isUsed?: boolean;
  usageDateStartAt: Date;
  usageDateEndAt: Date;
}

export class UpdateUserCouponDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } })
  count?: number;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 유효기간 시작' } })
  usageDateStartAt?: Date;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 유효기간 종료' } })
  usageDateEndAt?: Date;

  constructor(props?: UpdateUserCouponDTOProps) {
    if (props) {
      this.count = props.count;
      this.usageDateStartAt = props.usageDateStartAt;
      this.usageDateEndAt = props.usageDateEndAt;
    }
  }
}
