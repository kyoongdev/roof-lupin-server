import { CommonUserDTO, type CommonUserProps } from '@/modules/user/dto';
import { CurationDTO, type CurationDTOProps } from './curation.dto';
export interface CurationDetailDTOProps extends CurationDTOProps {
    content: string;
    user?: CommonUserProps;
}
export declare class CurationDetailDTO extends CurationDTO {
    content: string;
    user?: CommonUserDTO;
    constructor(props: CurationDetailDTOProps);
}
