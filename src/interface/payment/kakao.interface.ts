import type { YOrN } from './_shared.interface';

export type Card =
  | 'SHINHAN'
  | 'KB'
  | 'HYUNDAI'
  | 'LOTTE'
  | 'SAMSUNG'
  | 'NH'
  | 'BC'
  | 'HANA'
  | 'CITI'
  | 'KAKAOBANK'
  | 'KAKAOPAY';

export type PaymentMethodType = 'CARD' | 'MONEY';
export type PaymentActionType = 'PAYMENT' | 'CANCEL' | 'ISSUED_SID';
export type PaymentStatus =
  | 'READY'
  | 'SEND_TMS'
  | 'OPEN_PAYMENT'
  | 'SELECT_METHOD'
  | 'ARS_WAITING'
  | 'AUTH_PASSWORD'
  | 'ISSUED_SID'
  | 'SUCCESS_PAYMENT'
  | 'PART_CANCEL_PAYMENT'
  | 'CANCEL_PAYMENT'
  | 'FAIL_AUTH_PASSWORD'
  | 'QUIT_PAYMENT'
  | 'FAIL_PAYMENT';

export interface KakaoPayReadyRequest {
  /** 가맹정 코드 10자 */
  cid: string;
  /** 가맹점 코드 인증키, 24자, 숫자와 영문 소문자 조합 */
  cid_secret?: string;
  /** 가맹점 주문번호, 최대 100자 */
  partner_order_id: string;
  /** 가맹점 회원 id, 최대 100자 */
  partner_user_id: string;
  /** 상품명, 최대 100자 */
  item_name: string;
  /** 상품코드, 최대 100자 */
  item_code?: string;
  /** 상품 수량 */
  quantity: number;
  /* 상품 총액 */
  total_amount: number;
  /** 상품 비과세 금액 */
  tax_free_amount: number;
  /** 상품 부가세 금액 */
  vat_amount?: number;
  /** 컵 보증금 */
  green_deposit?: number;
  /** 결제 성공 시 redirect url */
  approval_url: string;
  /** 결제 취소 시 redirect url */
  cancel_url: string;
  /** 결제 실패 시 redirect url */
  fail_url: string;
  /** 결제 수단으로써 사용 허가할 카드사 */
  available_cards?: Card[];
  /** 사용 허가할 결제수단 */
  payment_method_type?: PaymentMethodType;
  /** 카드 할부개월 */
  install_month?: number;
  /** 결제 화면에 보여줄 사용자 정의 문구, 카카오페이와 사전 협의 필요 */
  custom_json?: Record<string, string>;
}

export interface KakaoPayReadyResponse {
  /** 결제 고유 번호, 20자 */
  tid: string;
  /** 요청한 클라이언트가 모바일 앱일 경우 카카오톡 결제 페이지 */
  next_redirect_app_url: string;
  /** 요청한 클라이언트가 모바일 웹일 경우 카카오톡 결제 페이지 */
  next_redirect_mobile_url: string;
  /** 요청한 클라이언트가 PC 웹일 경우 카카오톡 결제 페이지 */
  next_redirect_pc_url: string;
  /** 카카오페이 결제 화면으로 이동하는 Android 앱 스킴(Scheme) */
  android_app_scheme: string;
  /** 카카오페이 결제 화면으로 이동하는 iOS 앱 스킴 */
  ios_app_scheme: string;
  created_at: string;
}

export interface KakaoPayApproveRequest {
  cid: string;
  cid_secret?: string;
  tid: string;
  partner_order_id: string;
  partner_user_id: string;
  pg_token: string;
  payload?: string;
  total_amount?: number;
}

export interface Amount {
  /**  전체 결제 금액 */
  total: number;
  /** 비과세 금액 */
  tax_free: number;
  /** 부가세 금액 */
  vat: number;
  /** 사용한 포인트 금액 */
  point: number;
  /** 할인금액 */
  discount: number;
  /** 컵 보증금 */
  green_deposit: number;
}

export interface CardInfo {
  /** 매입 카드사 한글명 */
  purchase_corp: string;
  /** 매입 카드사 코드 */
  purchase_corp_code: string;
  /** 카드 발급사 한글명 */
  issuer_corp: string;
  /** 카드 발급사 코드 */
  issuer_corp_code: string;
  /** 카카오페이 매입사명 */
  kakaopay_purchase_corp: string;
  /** 카카오페이 매입사 코드 */
  kakaopay_purchase_corp_code: string;
  /** 카카오페이 발급사명 */
  kakaopay_issuer_corp: string;
  /** 카카오페이 발급사 코드 */
  kakaopay_issuer_corp_code: string;
  /** 카드 BIN */
  bin: string;
  /** 카드 타입 */
  card_type: string;
  /** 할부 개월 수  */
  install_month: string;
  /** 카드사 승인 번호 */
  approved_id: string;
  /** 카드사 가맹점 번호 */
  card_mid: string;
  /** 무이자 할부 여부 */
  interest_free_install: string;
  /** 카드 상품 코드 */
  card_item_code: string;
}

export interface KakaoPayApproveResponse {
  /** 요청 고유 번호 */
  aid: string;
  /** 결제 고유 번호 */
  tid: string;
  /** 가맹점 코드 */
  cid: string;
  /** 정기 결제용 ID, 정기 결제 CID로 단건 결제 요청 시 발급 */
  sid: string;
  /** 가맹점 주문번호, 최대 100자 */
  partner_order_id: string;
  /** 가맹점 회원 id, 최대 100자 */
  partner_user_id: string;
  /** 결제 수단, CARD 또는 MONEY 중 하나 */
  payment_method_type: PaymentMethodType;
  /** 결제 금액 정보 */
  amount: Amount;
  /** 결제 상세 정보, 결제수단이 카드일 경우만 포함 */
  card_info?: CardInfo;
  /** 상품 이름, 최대 100자 */
  item_name: string;
  /** 상품 코드, 최대 100자 */
  item_code: string;
  /** 상품 수량 */
  quantity: number;
  /** 결제 준비 요청 시각 */
  created_at: Date;
  /** 결제 승인 시각 */
  approved_at: Date;
  /** 결제 승인 요청에 대해 저장한 값, 요청 시 전달된 내용 */
  payload: string;
}

export interface KakaoPayOrderDetailRequestQuery {
  /** 가맹점 코드, 10자 */
  cid: string;
  /** 가맹점 코드 인증키, 24자, 숫자+영문 소문자 조합 */
  cid_secret?: string;
  /** 결제 고유번호, 20자 */
  tid: string;
}

export interface CanceledAmount {
  /** 전체 취소 금액*/
  total: number;
  /**취소된 비과세 금액 */
  tax_free: number;
  /**취소된 부가세 금액 */
  vat: number;
  /**취소된 포인트 금액 */
  point: number;
  /**	취소된 할인 금액 */
  discount: number;
  /** 컵 보증금  */
  green_deposit: number;
}
export interface CanceledAvailableAmount {
  /** 전체 취소 가능 금액 */
  total: number;
  /** 취소 가능한 비과세 금액 */
  tax_free: number;
  /** 취소 가능한 부가세 금액 */
  vat: number;
  /** 취소 가능한 포인트 금액 */
  point: number;
  /** 취소 가능한 할인 금액 */
  discount: number;
  /** 컵 보증금 */
  green_deposit: number;
}
export interface SelectedCardInfo {
  /** 카드 BIN */
  card_bin: string;
  /** 할부 개월 수 */
  install_month: number;
  /** 카드사 정보 */
  card_corp_name: string;
  /** 무이자할부 여부(Y/N) */
  interest_free_install: YOrN;
}
export interface PaymentActionDetails {
  /** Request 고유 번호 */
  aid: string;
  /** 거래시간 */
  approved_at: string;
  /** 결제/취소 총액 */
  amount: number;
  /** 결제/취소 포인트 금액 */
  point_amount: number;
  /** 할인 금액 */
  discount_amount: number;
  /** 컵 보증금 */
  green_deposit: number;
  /** 결제 타입 PAYMENT(결제), CANCEL(결제취소), ISSUED_SID(SID 발급) 중 하나 */
  payment_action_type: PaymentActionType;
  /** Request로 전달한 값 */
  payload: string;
}

export interface KakaoPayOrderDetailResponse {
  /**	결제 고유 번호, 20자 */
  tid: string;
  /**	가맹점 코드 */
  cid: string;
  /** 결제 상태 */
  status: PaymentStatus;
  /** 가맹점 주문번호 */
  partner_order_id: string;
  /** 가맹점 회원 id */
  partner_user_id: string;
  /** 결제 수단, CARD 또는 MONEY 중 하나 */
  payment_method_type: PaymentMethodType;
  /** 결제 금액 */
  amount: Amount;
  /** 취소된 금액 */
  canceled_amount: CanceledAmount;
  /** 취소 가능 금액 */
  cancel_available_amount: CanceledAvailableAmount;
  /** 상품 이름, 최대 100자 */
  item_name: string;
  /** 상품 코드, 최대 100자 */
  item_code: string;
  /** 상품 수량 */
  quantity: number;
  /** 결제 준비 요청 시각 */
  created_at: Date;
  /** 결제 승인 시각 */
  approved_at: Date;
  /** 결제 취소 시각 */
  canceled_at: Date;
  /** 결제 카드 정보 */
  selected_card_info: SelectedCardInfo;
  /** 결제/취소 상세 */
  payment_action_details: PaymentActionDetails[];
}

export interface KakaoPayCancelRequest {
  /** 가맹점 코드, 10자	*/
  cid: string;
  /** 가맹점 코드 인증키, 24자, 숫자+영문 소문자 조합	 */
  cid_secret?: string;
  /** 결제 고유번호	 */
  tid: string;
  /** 취소 금액	 */
  cancel_amount: number;
  /** 취소 비과세 금액 */
  cancel_tax_free_amount: number;
  /** 취소 부가세 금액 요청 시 값을 전달하지 않을 경우, (취소 금액 - 취소 비과세 금액)/11, 소숫점이하 반올림*/
  cancel_vat_amount?: number;
  /** 취소 가능 금액(결제 취소 요청 금액 포함)	*/
  cancel_available_amount?: number;
  /** 해당 요청에 대해 저장하고 싶은 값, 최대 200자	 */
  payload?: string;
}

export interface ApprovedCancelAmount {
  /** 이번 요청으로 취소된 전체 금액 */
  total: number;
  /** 이번 요청으로 취소된 비과세 금액 */
  tax_free: number;
  /** 이번 요청으로 취소된 부가세 금액 */
  vat: number;
  /** 이번 요청으로 취소된 포인트 금액 */
  point: number;
  /** 이번 요청으로 취소된 할인 금액 */
  discount: number;
  /** 컵 보증금 */
  green_deposit: number;
}

export interface KakaoPayCancelResponse {
  /** 요청 고유 번호 */
  aid: string;
  /**	결제 고유 번호, 20자 */
  tid: string;
  /**	가맹점 코드 */
  cid: string;
  /** 결제 상태 */
  status: PaymentStatus;
  /** 가맹점 주문번호 */
  partner_order_id: string;
  /** 가맹점 회원 id */
  partner_user_id: string;
  /** 결제 수단, CARD 또는 MONEY 중 하나 */
  payment_method_type: PaymentMethodType;
  /** 결제 금액 */
  amount: Amount;
  /** 이번 요청으로 취소된 금액 */
  approved_cancel_amount: ApprovedCancelAmount;
  /** 취소된 금액 */
  canceled_amount: CanceledAmount;
  /** 취소 가능 금액 */
  cancel_available_amount: CanceledAvailableAmount;
  /** 상품 이름, 최대 100자 */
  item_name: string;
  /** 상품 코드, 최대 100자 */
  item_code: string;
  /** 상품 수량 */
  quantity: number;
  /** 결제 준비 요청 시각 */
  created_at: Date;
  /** 결제 승인 시각 */
  approved_at: Date;
  /** 결제 취소 시각 */
  canceled_at: Date;

  payload: string;
}
