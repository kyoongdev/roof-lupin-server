import { Property } from 'cumuco-nestjs';

export class JusoDTO {
  @Property({ apiProperty: { type: 'string', description: '상세건물명' } })
  detBdNmList: string;

  @Property({ apiProperty: { type: 'string', description: '도로명 주소 (영문)' } })
  engAddr: string;

  @Property({ apiProperty: { type: 'string', description: '도로명' } })
  rn: string;

  @Property({ apiProperty: { type: 'string', description: '읍면동명' } })
  emdNm: string;

  @Property({ apiProperty: { type: 'string', description: '우편 번호' } })
  zipNo: string;

  @Property({ apiProperty: { type: 'string', description: '읍면동일련번호' } })
  emdNo: string;

  @Property({ apiProperty: { type: 'string', description: '시군구명' } })
  sggNm: string;

  @Property({ apiProperty: { type: 'string', description: '지번 주소' } })
  jibunAddr: string;

  @Property({ apiProperty: { type: 'string', description: '시도명' } })
  siNm: string;

  @Property({ apiProperty: { type: 'string', description: '도로명 주소 (참고항목 제외)' } })
  roadAddrPart1: string;

  @Property({ apiProperty: { type: 'string', description: '도로명 주소 참고항목' } })
  roadAddrPart2: string;

  @Property({ apiProperty: { type: 'string', description: '건물명 ' } })
  bdNm: string;

  @Property({ apiProperty: { type: 'string', description: '행정구역코드' } })
  admCd: string;

  @Property({ apiProperty: { type: 'string', description: '지하여부 (0 : 지상, 1 : 지하)' } })
  udrtYn: string;

  @Property({ apiProperty: { type: 'string', description: '지번본번(번지)' } })
  lnbrMnnm: string;

  @Property({ apiProperty: { type: 'string', description: '전체 도로명 주소' } })
  roadAddr: string;

  @Property({ apiProperty: { type: 'string', description: '지번부번' } })
  lnbrSlno: string;

  @Property({ apiProperty: { type: 'string', description: '건물본번' } })
  buldMnnm: string;

  @Property({ apiProperty: { type: 'string', description: '공동주책여부 (1 : 공동주택, 0 : 비공동주택)' } })
  bdKdcd: string;

  @Property({ apiProperty: { type: 'string', description: '법리명' } })
  liNm: string;

  @Property({ apiProperty: { type: 'string', description: '도로명코드' } })
  rnMgtSn: string;

  @Property({ apiProperty: { type: 'string', description: '산여부 (0 : 대지, 1 : 산)' } })
  mtYn: string;

  @Property({ apiProperty: { type: 'string', description: '건물관리번호' } })
  bdMgtSn: string;

  @Property({ apiProperty: { type: 'string', description: '건물부번' } })
  buldSlno: string;

  constructor(props: JusoDTO) {
    Object.assign(this, props);
  }
}
