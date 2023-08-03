import { Property } from 'cumuco-nestjs';

import { CommonUserDTO, CommonUserProps } from '@/modules/user/dto';

import { CouponDTO, CouponDTOProps } from './coupon.dto';

export interface UserCouponDTOProps {
  id: string;
  usageDateStartAt: Date;
  usageDateEndAt: Date;
  isUsed: boolean;
  createdAt: Date;
  user: CommonUserProps;
  coupon: CouponDTOProps;
  reservationId?: string;
}

export class UserCouponDTO {
  @Property({ apiProperty: { type: 'string', description: '유저 쿠폰 id' } })
  id: string;

  @Property({ apiProperty: { type: 'date', description: '쿠폰 사용 시작일' } })
  usageDateStartAt: Date;

  @Property({ apiProperty: { type: 'date', description: '쿠폰 사용 종료일' } })
  usageDateEndAt: Date;

  @Property({ apiProperty: { type: 'date', description: '쿠폰 생성일' } })
  createdAt: Date;

  @Property({ apiProperty: { type: 'string', nullable: true, description: '예약 id' } })
  reservationId?: string;

  @Property({ apiProperty: { type: CommonUserDTO, description: '유저 정보' } })
  user: CommonUserDTO;

  @Property({ apiProperty: { type: CouponDTO, description: '쿠폰 정보' } })
  coupon: CouponDTO;

  constructor(props: UserCouponDTOProps) {
    this.id = props.id;
    this.usageDateStartAt = props.usageDateStartAt;
    this.usageDateEndAt = props.usageDateEndAt;
    this.reservationId = props.reservationId ?? null;
    this.createdAt = props.createdAt;
    this.user = new CommonUserDTO(props.user);
    this.coupon = new CouponDTO(props.coupon);
  }
}
