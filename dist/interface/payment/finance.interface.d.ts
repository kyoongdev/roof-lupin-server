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
    bank_tran_id: string;
    bank_code_std: string;
    account_num: string;
    account_seq: string;
    account_holder_info_type: string;
    account_holder_info: string;
    tran_dtime: string;
}
export interface FinanceAccountAuthorizationResBody {
    api_tran_id: string;
    api_tran_dtm: string;
    rsp_code: string;
    rsp_message: string;
    bank_tran_id: string;
    bank_tran_date: string;
    bank_code_tran: string;
    bank_rsp_code: string;
    bank_rsp_message: string;
    bank_code_std: string;
    bank_code_sub: string;
    bank_name: string;
    account_num: string;
    account_holder_info_type: string;
    account_holder_info: string;
    account_holder_name: string;
    account_type: string;
}
