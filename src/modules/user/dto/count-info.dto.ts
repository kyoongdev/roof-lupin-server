import { Property } from 'cumuco-nestjs';

export interface CountInfoDTOProps {
  reservationCount: number;
  qnaCount: number;
  couponCount: number;
  reviewCount: number;
}

export class CountInfoDTO {
  @Property({ apiProperty: { type: 'number', description: '예약 수' } })
  reservationCount: number;

  @Property({ apiProperty: { type: 'number', description: 'qna 수' } })
  qnaCount: number;

  @Property({ apiProperty: { type: 'number', description: '쿠폰 수' } })
  couponCount: number;

  @Property({ apiProperty: { type: 'number', description: '리뷰 수' } })
  reviewCount: number;

  constructor(props: CountInfoDTOProps) {
    this.reservationCount = props.reservationCount;
    this.qnaCount = props.qnaCount;
    this.couponCount = props.couponCount;
    this.reviewCount = props.reviewCount;
  }
}
