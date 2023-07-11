import { Property } from 'wemacu-nestjs';

export interface UpdateUserCouponDTOProps {
  count?: number;
  isUsed?: boolean;
  usageDateStartAt: Date;
  usageDateEndAt: Date;
}

export class UpdateUserCouponDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } })
  count?: number;

  @Property({ apiProperty: { type: 'boolean', nullable: true, description: '쿠폰 사용 여부' } })
  isUsed?: boolean;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 유효기간 시작' } })
  usageDateStartAt?: Date;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '쿠폰 유효기간 종료' } })
  usageDateEndAt?: Date;

  constructor(props?: UpdateUserCouponDTOProps) {
    if (props) {
      this.count = props.count;
      this.isUsed = props.isUsed;
    }
  }
}
