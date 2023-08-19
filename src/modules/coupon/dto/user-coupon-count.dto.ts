import { Property } from 'cumuco-nestjs';

export interface UserCouponCountDTOProps {
  count: number;
}

export class UserCouponCountDTO {
  @Property({ apiProperty: { type: 'number', description: '쿠폰 개수' } })
  count: number;

  constructor(props: UserCouponCountDTOProps) {
    this.count = props.count;
  }
}
