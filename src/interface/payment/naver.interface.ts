export interface ProductItem {
  /** 결제 상품 유형 */
  categoryType: 'PRODUCT';
  /** 결제 상품 유형*/
  categoryId: 'GENERAL';
  /** 상품 식별 키 */
  uid: string;
  /** 상품명 */
  name: string;
  /** 유입경로 */
  payReferrer?: string;
  /** 시작일 */
  startDate?: string;
  /** 종료일 */
  endDate?: string;
  /** 식별키 */
  sellerId?: string;
  /** 상품개수 */
  count: number;
}

export interface PayReserveParameters {
  /** 가맹점 결제번호 또는 주문번호 */
  merchantPayKey: string;
  /** 가맹점 사용자 키 */
  merchantUserKey: string;
  /** 상품명 */
  productName: string;
  /** 상품 수량 ex) A 2개, B 1개 -> 3*/
  productCount: number;
  /** 총 결제 금액 */
  totalPayAmount: number;
  /** 과세 대상 금액 */
  taxScopeAmount: number;
  /** 면세 대상 금액 */
  taxExScopeAmount: number;
  /** 결제 인증 결과 전달 URL */
  returnUrl: string;
  /** 구매자 성명 */
  purchaserName: string;
  /** 구매자 생년월일 */
  purchaserBirthDay: string;
  /** productItem 배열 */
  productItems: ProductItem[];
}

export interface ReturnUrlQuery {
  /** 결제 결과 */
  resultCode: string;
  /** 네이버페이 결제번호 */
  paymentId: string;
}

export interface ApplyPaymentQuery {
  paymentId: string;
}
