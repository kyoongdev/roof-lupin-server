import { ReportStatus, ReportStatusReqDecorator } from './validation';

export interface UpdateReportDTOProps {
  reportStatus: ReportStatus;
}

export class UpdateReportDTO {
  @ReportStatusReqDecorator()
  reportStatus: number;

  constructor(props?: UpdateReportDTOProps) {
    if (props) {
      this.reportStatus = props.reportStatus;
    }
  }
}
