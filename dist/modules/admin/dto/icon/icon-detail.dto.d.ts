import { IconDTO, IconDTOProps } from './icon.dto';
export interface IconDetailDTOProps extends IconDTOProps {
    inUse: boolean;
}
export declare class IconDetailDTO extends IconDTO {
    inUse: boolean;
    constructor(props: IconDetailDTOProps);
}
