import { BANK_CODE, CARD_CODE } from '@/common/constants';

/** 01 : 원결제 승인건, 03: 전체취소 건, 04:부분취소 건 */
export type AdmissionTypeCode = '01' | '03' | '04';

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

export interface NaverApprovePaymentDetail {
  /** 결제번호 */
  paymentId: string;
  /** 결제 이력 번호 */
  payHistId: string;
  /** 가맹점 아이디 */
  merchantId: string;
  /** 가맹점명 */
  merchantName: string;
  /** 가맹점의 결제번호 */
  merchantPayKey: string;
  /** 가맹점의 사용자 키 */
  merchantUserKey: string;
  /** 결제 승인 유형 */
  admissionTypeCode: AdmissionTypeCode;
  /** 결제/취소 일시 */
  admissionYmdt: string;
  /** 거래완료 일시(정산기준 날짜) */
  tradeConfirmYmdt: string;
  /** 결제/취소 시도에 대한 최종결과 */
  admissionState: 'SUCCESS' | 'FAIL';
  /** 총 결제 금액 */
  totalPayAmount: number;
  /** 주 결제 수단 결제 금액 */
  primaryPayAmount: number;
  /** 네이버페이 포인트/머니 결제 금액 */
  npointPayAmount: number;
  /** 기프트카드 결제 금액 */
  giftCardAmount: number;
  /** 과세 결제 금액 */
  taxScopeAmount: number;
  /** 면세 결제 금액 */
  taxExScopeAmount: number;
  /** 컵 보증금 결제 금액 */
  environmentDepositAmount: number;
  /** 주 결제 수단 */
  primaryPayMeans: 'CARD' | 'BANK';
  /** 주 결제 수단 카드사 */
  cardCorpCode: keyof typeof CARD_CODE;
  /** 일부 마스킹 된 신용카드 번호 */
  cardNo: string;
  /** 카드 승인 번호 */
  cardAuthNo: string;
  /** 할부 개월 수  */
  cardInstCount: number;
  /** 카드사 포인트 사용 유무 */
  usedCardPoint: boolean;
  /** 주 결제 수단 은행 */
  bankCorpCode: keyof typeof BANK_CODE;
  /** 일부 마스킹 된 계좌 번호 */
  bankAccountNo: string;
  /** 상품명 */
  productName: string;
  /** 정산 예정 금액과 결제 수수료 금액 계산 여부 */
  settleExpected: boolean;
  /** 정산 예정 금액 */
  settleExpectAmount: number;
  /** 결제 수수료 금액 */
  payCommissionAmount: number;
  /** 도서 / 공연 소득공제 여부 */
  extraDeduction: boolean;
  /** 이용 완료일 */
  useCfmYmdt: string;
  /** 예비필드 */
  merchantExtraParameter: string;
  /** 암호화된 사용자 구분 값 */
  userIdentifier?: string;
}
export interface NaverApprovedPayment {
  paymentId: string;
  detail: NaverApprovePaymentDetail;
}

export interface NaverCancelPayment {
  /** 네이버페이 결제 번호 */
  paymentId: string;
  /** 취소 요청 금액 */
  cancelAmount: number;
  /** 취소 사유 */
  cancelReason: string;
  /** 취소 요청자 1 : 구매자, 2 : 가맹점 관리자 */
  cancelRequester: '1' | '2';
  /** 과세 대상 금액 */
  taxScopeAmount: number;
  /** 면세 대상 금액 */
  taxExScopeAmount: number;
  /** 컵 보증금 대상 금액 */
  environmentDepositAmount: number;
  /** 가맹점의 남은 금액과 네이버페이의 남은 금액 일치하는지 체크하는 기능을 수행할 지 여부  (1 : 수행 , 2 :미수행) */
  doCompareRest: Number;
  /** 이번 취소가 수행되고 난 후에 남을 가맹점의 예상금액 */
  expectedRestAmount: number;
}
