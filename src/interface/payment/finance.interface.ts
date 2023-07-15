export interface FinanceGetCode {
  response_type: 'code';
  client_id: string;
  redirect_uri: string;
  scope: string;
  state: string;
  auth_type: 0 | 1 | 2;
}

export interface FinanceUserAuthorizationReqBody {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: string;
}

export interface FinanceUserAuthorizationResBody {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  user_seq_no: string;
}

export interface FinanceAccountAuthorizationReqBody {
  /** 은행거래고유번호 */
  bank_tran_id: string;
  /** 개설기관 표준코드 */
  bank_code_std: string;
  /** 계좌번호 */
  account_num: string;
  /** 회차번호 */
  account_seq: string;
  /** 예금주 실명번호 구분코드 */
  account_holder_info_type: string;
  /** 예금주 인증정보 */
  account_holder_info: string;
  /** 요청일시 */
  tran_dtime: string;
}

export interface FinanceAccountAuthorizationResBody {
  /** 거래 고유번호 */
  api_tran_id: string;
  /** 거래일시 */
  api_tran_dtm: string;
  /** 응답코드 */
  rsp_code: string;
  /** 응답메시지 */
  rsp_message: string;
  /** 거래고유번호 */
  bank_tran_id: string;
  /** 거래일자 */
  bank_tran_date: string;
  /** 응답코드를 부여한 참가기관 표준코드 */
  bank_code_tran: string;
  /** 응답코드 */
  bank_rsp_code: string;
  /** 응답메시지 */
  bank_rsp_message: string;
  /** 개설기관.표준코드 */
  bank_code_std: string;
  /** 개설기관.점별코드 */
  bank_code_sub: string;
  /** 개설기관명 */
  bank_name: string;
  /** 계좌번호 */
  account_num: string;
  /** 회차번호 */
  account_holder_info_type: string;
  /** 거래금액 */
  account_holder_info: string;
  /** 예금주 성명 */
  account_holder_name: string;
  /** 계좌종류 */
  account_type: string;
}
