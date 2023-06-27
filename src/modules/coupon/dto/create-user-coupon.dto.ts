import { Property } from 'wemacu-nestjs';

export interface CreateUserCouponDTOProps {
  count?: number;
  userId: string;
}

export class CreateUserCouponDTO {
  @Property({ apiProperty: { type: 'number', nullable: true, description: '쿠폰 개수' } })
  count?: number;

  @Property({ apiProperty: { type: 'string', description: '유저 id' } })
  userId: string;

  constructor(props?: CreateUserCouponDTOProps) {
    if (props) {
      this.count = props.count;
      this.userId = props.userId;
    }
  }
}
