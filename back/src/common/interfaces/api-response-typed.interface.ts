import { PageMetaDto } from "../dtos-globals/page-meta.dto";

export type ResponseTypedApis = ResponseTypedSuccessPaginated | ResponseTypedSuccess | ResponseTypedError;

export class ResponseTypedSuccessPaginated {
    statusCode: number;
    message: string;
    data: any;
    meta: PageMetaDto;
    filterBy?: {
        name: string;
        typeof: string;
    }[];
}

export class ResponseTypedSuccess {
    statusCode: number;
    message: string;
    data: any;
}

export class ResponseTypedError {
    statusCode: number;
    message: string;
}