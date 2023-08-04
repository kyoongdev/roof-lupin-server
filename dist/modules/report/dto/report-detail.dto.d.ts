import { SpaceDTO, SpaceDTOProps } from '@/modules/space/dto';
import { ReportAnswerDTO, ReportAnswerDTOProps } from './report-answer.dto';
import { ReportDTO, ReportDTOProps } from './report.dto';
export interface ReportDetailDTOProps extends ReportDTOProps {
    space: SpaceDTOProps;
    answer: ReportAnswerDTOProps;
}
export declare class ReportDetailDTO extends ReportDTO {
    space: SpaceDTO;
    answer?: ReportAnswerDTO;
    constructor(props: ReportDetailDTOProps);
}
