import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface AppError {
  message: string;
  code: number;
  originalError: any;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorMapperService {
  public mapHttpError(error: HttpErrorResponse): AppError {
    let message = 'Ha ocurrido un erro. Por favor, intenta más tarde.';

    if (error.status === HttpStatusCode.Unauthorized)
      message = 'Tu sesión ha expirado. Por favor, inicia sesión';
    if (error.status === HttpStatusCode.Forbidden)
      message = 'No tienes permiso para realizar esta acción';
    if (error.status === HttpStatusCode.NotFound)
      message = 'El recurso solicitado no existe';
    if (error.status === HttpStatusCode.BadRequest)
      message = 'Valida la información ingresada';
    console.log('[ErrorMapperService] mapHttpError', error);
    return {
      message,
      code: error.status,
      originalError: error,
    };
  }
}
