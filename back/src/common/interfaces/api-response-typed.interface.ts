export type ResponseTypedApis = ResponseTypedSuccess | ResponseTypedError;

export class ResponseTypedSuccess {
    statusCode: number;
    message: string;
    data: any;
}

export class ResponseTypedError {
    statusCode: number;
    message: string;
}