export interface Juso {
  /** 상세건물명 */
  detBdNmList: string;
  /** 도로명 주소 (영문) */
  engAddr: string;
  /** 도로명 */
  rn: string;
  /*** 읍면동명 */
  emdNm: string;
  /** 우편 번호 */
  zipNo: string;
  /** 읍면동일련번호 */
  emdNo: string;
  /** 시군구명 */
  sggNm: string;
  /** 지번 주소 */
  jibunAddr: string;
  /** 시도명 */
  siNm: string;
  /** 도로명 주소 (참고항목 제외) */
  roadAddrPart1: string;
  /** 도로명 주소 참고항목 */
  roadAddrPart2: string;
  /** 건물명 */
  bdNm: string;
  /** 행정구역코드 */
  admCd: string;
  /** 지하여부 (0 : 지상, 1 : 지하) */
  udrtYn: string;
  /** 지번본번(번지) */
  lnbrMnnm: string;
  /** 전체 도로명 주소 */
  roadAddr: string;
  /** 지번부번 */
  lnbrSlno: string;
  /** 건물본번 */
  buldMnnm: string;
  /** 공동주책여부 (1 : 공동주택, 0 : 비공동주택) */
  bdKdcd: string;
  /** 법리명 */
  liNm: string;
  /** 도로명코드 */
  rnMgtSn: string;
  /** 산여부 (0 : 대지, 1 : 산) */
  mtYn: string;
  /** 건물관리번호 */
  bdMgtSn: string;
  /** 건물부번 */
  buldSlno: string;
}

export interface Common {
  errorMessage: string;
  countPerPage: string;
  totalCount: string;
  errorCode: string;
  currentPage: string;
}

export interface AddressResult {
  results: {
    common: Common;
    juso: Juso[];
  };
}
