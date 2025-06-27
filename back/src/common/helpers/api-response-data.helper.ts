import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ResponseCodes } from '../constanst/response-code';
import { ResponseTypedError, ResponseTypedSuccess, ResponseTypedSuccessPaginated } from '../interfaces/api-response-typed.interface';
import { PageMetaDto } from '../dtos-globals/page-meta.dto';

@Injectable()
export class ApiResponseDataHelper {
  // Respuesta de éxito paginada
  static sendSuccessPaginated(data: any[], meta: PageMetaDto, message: string = 'Solicitud exitosa', statusCode: HttpStatus = ResponseCodes.SUCCESS.OK): ResponseTypedSuccessPaginated {
    return {
      statusCode,
      message,
      data,
      meta
    };
  }

  // Respuesta de éxito
  static sendSuccess(data: any, message: string = 'Solicitud exitosa', statusCode: HttpStatus = ResponseCodes.SUCCESS.OK): ResponseTypedSuccess {
    return {
      statusCode,
      message,
      data,
    };
  }

  // Respuesta de error "Not Found"
  static sendNotFound(message: string = 'Recurso no encontrado', statusCode: HttpStatus = ResponseCodes.CLIENT_ERROR.NOT_FOUND): ResponseTypedError {
    throw new HttpException(
      { statusCode, message },
      statusCode,
    );
  }

  // Respuesta de error "Duplicado"
  static sendConflict(message: string = 'El recurso ya existe', statusCode: HttpStatus = ResponseCodes.CLIENT_ERROR.CONFLICT): ResponseTypedError {
    throw new HttpException(
      { statusCode, message },
      statusCode,
    );
  }

  // Respuesta de recurso creado
  static sendCreated(data: any, message: string = 'Recurso creado exitosamente'): ResponseTypedSuccess {
    return {
      statusCode: ResponseCodes.SUCCESS.CREATED,
      message,
      data,
    };
  }

  // Respuesta de error "Bad Request"
  static sendBadRequest(message: string = 'Solicitud inválida', statusCode: HttpStatus = ResponseCodes.CLIENT_ERROR.BAD_REQUEST): ResponseTypedError {
    throw new HttpException(
      { statusCode, message },
      statusCode,
    );
  }

  static sendError(message: string = 'Ocurrió un error', statusCode: HttpStatus = ResponseCodes.SERVER_ERROR.INTERNAL_SERVER_ERROR): ResponseTypedError {
    throw new HttpException(
      { statusCode, message },
      statusCode,
    );
  }
}
